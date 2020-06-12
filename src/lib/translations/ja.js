/* eslint-disable quotes */
/**
 * JA / Japanese
 */

const features = {
	menu: '特長',
	feature1: {
		name: 'データをオフラインのソースとマッチングする',
		description: `他のコンテクストにおいて最初に収集されたオフラインソースのデータを組み合わせます。`,
	},
	feature2: {
		name: `端末のリンク付け`,
		description: `利用者のデータを処理して当該利用者を複数の端末に接続できるようにします。`,
	},
	feature3: {
		name: `正確な地理的位置データ`,
		description: `特定のサードパーティが同意した目的を支援するために、利用者の正確な地理的位置データの処理を許可します。`,
	},
};

export default {
	banner: {
		title: 'プライバシーの選択',
		description: `
					本サイトを利用されることにより、お客様は当社が個別にカスタマイズされたコンテンツおよび広告を提供し、サイトの利用を測定および分析するためにクッキーおよび情報を使用することに同意されることになります。設定を変更するには「詳しく読む」をクリックしてください。
				`,
		links: {
			data: {
				title: '使用される情報',
				description: `			
							<ul>		
								<li>ブラウザのタイプとその設定</li>	
								<li>端末のオペレーティングシステムに関する情報</li>	
								<li>クッキーに関する情報</li>	
								<li>端末に割り当てられる他の識別情報に関する情報</li>	
								<li>端末がクライアントのウェブサイトまたはモバイルアプリケーションにアクセスする際の	
									IPアドレス
								</li>	
								<li>訪問先または使用したウェブページおよびモバイルアプリを含む、	
									その端末上でのユーザーアクティビティに関する情報
								</li>	
								<li>ウェブサイトまたはモバイルのアプリケーションに	
									アクセス
									する際の端末の地理的位置に関する情報
								</li>	
							</ul>		
						`,
			},
			purposes: {
				title: '情報を保管する目的',
			},
			manage: '詳しく読む' /* 詳しく読む */,
			accept: 'はい、分かりました' /* OK */,
		},
	},
	summary: {
		title: '情報の使われ方について詳しく知りたいですか？',
		description: `当社および選択された企業がお客様の情報にアクセスし、以下の目的のために					
					使用することができます。以下の選択肢をカスタマイズするか、				
					目的をご了承いただける場合はそのまま当社サイトをご利用ください。`,
		detailLink: '詳しく読む & 環境設定',
		who: {
			title: 'この情報は誰が使用するのでしょうか？',
			description: `当社および予め選択された企業がお客様の情報を使用します。各企業については				
						上記のリンクをご覧いただくか、`,
			link: 'こちらから全リストをご覧いただけます。',
		},
		what: {
			title: 'どのような情報が使用されるのでしょうか？',
			description: '様々な企業がそれぞれ異なる情報を使用します。',
			link: 'こちらから全リストをご覧いただけます。',
		},
	},
	details: {
		back: '戻る',
		save: 'はい、分かりました',
	},
	purposes: {
		title: '',
		description: '',
		back: '',
		globalOptoutDescription: `					
					<p>				
						収集、使用、また処理するデータの種類や、仕様によりプライバシーが含まれる他の要素に従い、			
						お客様の同意に依存する特定のパートナーもいれば、選択解除を求められる場合もあります。各ベンダーに関する情報や			
						選択を実行される場合は、以下をご覧ください。また選択を解除される場合は、以下にアクセスしてください			
						<a href="http://optout.networkadvertising.org/?c=1#!/" target="_blank">			
							NAI		
						</a>			
						,			
						<a href="http://optout.aboutads.info/?c=2#!/" target="_blank">			
							DAA		
						</a>			
						, and			
						<a href="http://youronlinechoices.eu/" target="_blank">			
							EDAA		
						</a>			
						sites.			
					</p>				
				`,
		purpose1: {
			description: '利用者の端末上への情報の保管または情報へのアクセスを許可します。',
			menu: '情報の保管およびアクセスのテスト',
			optoutDescription: '',
		},
		purpose2: {
			description: `複数のサイト、アプリ、また端末から収集されたデータから分かる、あるいは推測される利用者の好みまたは関心に基づいて個別にカスタマイズされた広告を提供し情報を提供するために、利用者のデータの処理 (配信、測定および報告を含む) を許可します。また場合によってはその目的のために情報にアクセスするか、それを端末に保管します。				
					以下の機能が含まれます:				
					<ul>				
						<li>${features.feature1.name} - ${features.feature1.description}</li>
						<li>${features.feature2.name} - ${features.feature2.description}</li>
						<li>${features.feature3.name} - ${features.feature3.description}</li>
					</ul>`,
			menu: '個別化',
		},
		purpose3: {
			description: `コンテンツまたは広告を配信するために利用者のデータを処理し、当該のコンテンツまたは広告の配信の測定を行い、洞察を抽出してレポートを作成し、サービスの利用状態を理解できるようにします。また場合によってはその目的のために情報にアクセスするか、それを端末に保管します。				
					以下の機能が含まれます:				
					<ul>				
						<li>${features.feature1.name} - ${features.feature1.description}</li>
						<li>${features.feature2.name} - ${features.feature2.description}</li>
						<li>${features.feature3.name} - ${features.feature3.description}</li>
					</ul>`,
			menu: '広告の選択、配信、レポート作成',
		},
		purpose4: {
			description: `複数のサイト、アプリ、また端末から収集されたデータから分かる、あるいは推測される利用者の好みまたは関心に基づいて個別にカスタマイズされた広告を提供し情報を提供するために、利用者のデータの処理 (配信、測定および報告を含む) を許可します。また場合によってはその目的のために情報にアクセスするか、それを端末に保管します。				
					以下の機能が含まれます:
					<ul>
						<li>${features.feature1.name} - ${features.feature1.description}</li>
						<li>${features.feature2.name} - ${features.feature2.description}</li>
						<li>${features.feature3.name} - ${features.feature3.description}</li>
					</ul>`,
			menu: 'コンテンツの選択、配信、レポート作成',
		},
		purpose5: {
			description: `				
						お客様のコンテンツに関する情報の収集と、お客様のサービス利用状況の測定、理解およびそれに関するレポートに使用される、以前収集された情報との組合せです。これには、後に他のコンテクスト、すなわち例えばウェブサイトやアプリ、時系列などの他のサービスにおけるお客様向けのコンテンツや、場合によっては広告を個別化するための、個別化情報およびお客様の本サービス使用に関する情報の収集は含まれていません。
					`,
			menu: '測定',
		},
	},
	vendors: {
		title: 'この情報は誰が使用するのでしょうか？',
		description: `					
						こちらがお客様の情報を使用する企業の全リストです。詳しくは個人情報保護方針をお読みください。
					`,
		accept: '許可する',
		acceptAll: '"全て許可する',
		acceptNone: '全て拒否する',
		optOut: '選択解除が必要',
		back: '前のページでこれらの企業がデータを使用する方法をカスタマイズしてください',
	},
	features,
	footer: {
		message: `					
						<h2>当社はプライバシーを尊重します</h2>				
					`,
		description: `					
						<span>				
							このウェブサイトの改善に役立て、お客様のコンテンツ体験を			
							個別化および促進し、広告の目的および当社のトラフィックを分析するために、			
							当社および当社のパートナーはクッキーやピクセル、また場合によっては			
							ビーコンなどのテクノロジーを使用して特定のデータを収集します。サイトを			
							引き続き利用されるか「OK」をクリックされることで、お客様はこのテクノロジーの			
							使用およびデータの収集に同意されることになります。			
						</span>				
					`,
		privacyPolicy: `					
						<span>				
							当社の			
							<a target="_blank" href="http://system1.com/terms/privacy.html">			
								個人情報保護方針		
							</a>			
							をお読みいただき、当社のデータの収集および使用方法についてよく理解してください。設定は随時、			
							以下の順にクリックすることで変更できます。			
						</span>				
					`,
		privacyPolicyButton: 'プライバシーの設定を管理する',
		consentLink: 'OK',
	},
};
