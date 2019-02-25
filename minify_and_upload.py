from subprocess import run, check_output, call
from sys import argv
import preppy
import os, shutil

# List of files we want to process as a default behavior
supported_locales = ["en", "fr", "es"]
files_to_process = [*["m32cmploader_{}.js".format locale for locale in supported_locales], "m32cmp.js"]

def minify(files):
    for file in files:
        # -m is to mangle the names, -o is the output (obviously)
        call(["uglifyjs", "-m", file, "-o", "{}.min.js".format(file.split(".")[0])])

def put_on_rdc(file):
        run(['gcloud', 'compute', '--project', 'm32-infrastructure', 'copy-files', file, 'bitnami@rdc1-m32-media-prod:/rdc/html/{}'.format(file), '--zone', 'us-east1-b']).check_returncode()

def upload(files):
    for file in files:
        # Stores the new minified and unminified files.
        if file in files_to_process:
            put_on_rdc('{}.min.js'.format(file.split(".")[0]))
        put_on_rdc(file)

def build_loaders_for_all_locales():
    """builds a different loader script for each locale. If you want to add one, add it to the supported_locales array above."""
    for locale in supported_locales:
        with open("m32cmploader_{}.js".format(locale), "w+") as f:
            f.write(preppy.getModule("cmp_loader.prep").get(m32hb_text))

def get_bundled_cmp_from_build_folder():
    # copies the file to our current dir if it's there. Otherwise, warn the user to use yarn build
    if os.path.isfile("build/cmp.bundle.js"):
        shutil.copy("build/cmp.bundle.js", "m32cmp.js")
    else:
        print("the build/cmp.bundle.js is not present, did you run `yarn build` ?")


if __name__ == "__main__":
    # Default behavior of this script is to minify and upload everything that needs it
    build_loaders_for_all_locales()
    get_bundled_cmp_from_build_folder()
    minify(files_to_process)
    upload(files_to_process)
