/**
 * Created by msyk on 15/10/12.
 */

var config = {
    theme: "msyk3",
    transition: "fade",
    openParen: "\\[",
    closeParen: "\\]"
};

var contents = [
    {
        maintitle: "FileMakerが遂に密林で[[BR]]雲のごとく現る！",
        subtitle: "FM-Tokyo 2016-10-16",
        coveritems: [
            "新居雅行　Masayuki Nii, Ph.D. in Engineering",
            "[[IMG|images/email.png|30px|30px]] nii@msyk.net "
            + "[[IMG|images/facebook.png|30px|30px]] msyknii "
            + "[[IMG|images/twitter.png|30px|30px]] msyk_nii"
        ]
    },
    {
        title: "自己紹介: 新居雅行",
        items: [
            "博士(工学)/独立系エンジニア/業務系中心",
            "FileMaker as a Relation Database 著者",
            "INTER-Mediator Start-up Engineer",
            "-FileMaker利用者に最適なWebアプリケーションフレームワーク。HTMLと設定ファイルの記述だけで、読み書き可能なWebページを作成可能",
            "My Fields",
            "-Database, Modeling, FileMaker, Web Dev., Framework, iOS/macOS Native Dev., Linux, Windows Server, Technical Education, Setting up a lot of PC/Mac",
        ],
        fig3: "images/cover.jpg"
    },
    {
        title: "Agenda",
        items: [
            "クラウドコンピューティングとは？",
            "AWSで稼働するFileMaker Cloud",
            "FileMaker Cloud登場後の今後を占う",
        ]
    },
    {
        centertitle: "クラウドコンピューティング"
    },
    {
        title: "クラウドとは？",
        items: [
            "[[span|demo|今世紀最大のIT業界が産んだバズワード]]",
            "ネットワークの先にあるコンピューター資源を利用すること",
            "-資源＝サーバー、ディスク装置、アプリケーションなどを、サービスとして利用できる",
            "-自分でハードウエアを用意しなくても、サーバーやディスク領域を利用できる",
            "反対語＝オンプレミス",
            "-利用者がコンピューター資源を用意し、運用管理する形態"
        ]
    },
    {
        title: "プロバイダと一体どこが違うの？",
        items: [
            "プロバイダの業務にかなり似ている",
            "-いわゆる「サービスプロバイダ」の業務内容は、現在はクラウドの一部分と見られることも多い",
            "本質的な違いは「スケール」できること",
            "-増加＝ディスクを増やす",
            "-アップグレード＝機能アップする",
            "-[[span|demo|スケールアウト＝コンピューターそのものを増やして処理能力を上げる]]",
            "必要な時に、必要なだけの資源を使えるという点が、レンタルサーバーなどのサービスと違うところ",
        ]
    },
    {
        title: "AWS (Amazon Web Services)",
        items: [
            "Amazonは通販だけが業務でない",
            "-クラウドコンピューティングサービスを2006年より開始、現在は代表的なクラウドサービス",
            "-EC事業の不振からの新しいビジネス創造",
            "-とは言え、自社事業との相乗効果は高い"
        ],
        fig3: "images/shot3260.png"
    },
    {
        title: "Amazonでの代表的なサービス",
        items: [
            "サーバーインスタンス",
            "-EC2 (Amazon Elastic Compute Cloud)",
            "ストレージ",
            "-S3 (Amazon Simple Storage Service)",
            "データベース",
            "-Amazon Relational Database Service",
            "-Amazon DynamoDB/SimpleDB",
        ],
        fig3: "images/shot3261.png"
    },
    {
        title: "「サーバーを1台用意する」",
        items: [
            "手軽に使えるAWS",
            "-クレジットカード番号を入れれば即使える",
            "-サービスの作成や設定はWebブラウザーで行う",
            "EC2のインスタンスを作成する",
            "-細かい設定もできるが、通常はシステムイメージとインスタンスタイプの選択程度",
            "-自動的にストレージが割り当てられる",
            "-インスタンスにはIPアドレスが割り当てられ、アクセスするためのグローバルアドレスも割り当てられる",
            "-ファイアウォールも割り当てられる"
        ]
    },
    {
        title: "EC2のコンソール",
        fig2: "images/shot3262.png"
    },
    {
        title: "AMI(システムイメージを選択)",
        fig2: "images/shot3263.png"
    },
    {
        title: "インスタンスタイプを選択(1)",
        fig2: "images/shot3264.png"
    },
    {
        title: "インスタンスタイプを選択(2)",
        fig2: "images/shot3265.png"
    },
    {
        title: "ネットワークもサービスの1つ",
        fig2: "images/shot3266.png"
    },
    {
        title: "ストレージの設定",
        fig2: "images/shot3267.png"
    },
    {
        title: "セキュリティグループの設定",
        fig2: "images/shot3268.png"
    },
    {
        title: "なぜ、全てがクラウドの移行しないのか？",
        items: [
            "コストが安く済む場合はあまり多くない",
            "-サーバーを1台運用するだけなら、VPSサービスの方が安価である",
            "-一般に、クラウドはスケールできるだけに価値が高く、価格も高い",
            "セキュリティが心配と思う人が多い",
            "-実際には、自社サーバールームにあるサーバーよりよほど安全",
            "ニーズに合わない/柔軟性がない",
            "-今までだとFileMaker Serverの運用をしたいとしても、手軽にはできなかった",
            "-柔軟に、スケールして…といったことを本当にできるかどうか",
            "ネットワークの先にあるという漠然とした不安",
            "-ネットワーク接続を安定して高速に利用できる状態をキープできないと思っている"
        ]
    },
    {
        centertitle: "FileMaker Cloud"
    },
    {
        title: "FileMakerのクラウドってなかった？",
        items: [
            "Google検索「FileMaker クラウド」などとやると…",
            "-YFMcloud (イエスウィキャン)",
            "-FMHostクラウド (ユニティップス)",
            "こちらの皆さんは、従来のFileMaker Server 15をクラウド上で運用し、さらにそれを顧客が利用できるようにしたサービス"
        ]
    },
    {
        title: "FileMaker Cloud 1.15",
        items: [
            "Linuxで稼働するFileMaker Server",
            "EC2のAMIでソフトウエアは提供される",
            "-AMIはソフトウエアインストール済みのディスクと思えば良い",
            "現在はアメリカとカナダでのみ提供",
            "-日本のユーザーはセットアップしただけでは使えない",
            "-なんらかのアクティベーションが必要な模様で、その作業はFileMaker社によって行われる",
            "-AWSのアカウント情報から国を判断している模様で、セットアップはできるもののアクティベーションされない",
        ]
    },
    {
        title: "機能比較",
        table: [
            ["#FileMaker Server 15", "", "#FileMaker Cloud 1.15"],
            ["オンプレミス", "#稼働環境", "クラウド AWS"],
            ["OS X, Windows Server", "#動作環境", "CentOS 7.2"],
            ["Admin Console", "#管理ツール", "New Admin Console"],
            ["データベースアカウント[[BR]]LDAP/Active Directory", "#認証システム",
                "データベースアカウント[[BR]]OAuth（予定）"],
            ["FileMaker DBの共有[[BR]]Web Direct[[BR]]ODBC/JDBC[[BR]]ESS[[BR]]カスタムWeb", "#共有対象",
                "FileMaker DBの共有[[BR]]Web Direct[[BR]]ODBC / JDBC with Driver[[BR]]ESS, except for ESS Adapter[[BR]]FileMaker Data API（予定）"],
        ]
    },
    {
        title: "ライセンス",
        items: [
            "既存のFileMaker Serverのアカウントを切り替える",
            "-BYOL(自分のライセンスを利用する)は、年間あるいは期限なしに関わらず、ライセンスの切り替えを行う",
            "新たにFileMakerから購入する",
            "-5〜100ユーザー(刻み細かい)、年間契約のタイプ",
            "-インスタンス作成後にFileMaker Storeで購入する",
            "AWSの使用料として支払う",
            "-5, 10, 25, 100ユーザー、時間ないしは年間契約",
        ]
    },
    {
        title: "EC2のインスタンスを作ってみた",
        items: [
            "",
        ]
    },
    {
        title: "FileMaker CloudというAMIがある",
        fig1: "images/fig3.png"
    },
    {
        title: "AMI自体の使用料が設定されている",
        fig1: "images/fig4.png"
    },
    {
        title: "試用版もこちらになるのかも",
        fig1: "images/fig5.png"
    },
    {
        title: "EC2のインスタンスを作ってみた",
        fig1: "images/fig1.png"
    },
    {
        title: "別の種類の価格表もある",
        fig1: "images/fig2.png"
    },
    {
        title: "サーバーの管理画面(ショット)",
        fig1: "images/shot3271.png"
    },
    {
        title: "インスタンスを消してもそのまま放置すると…",
        fig1: "images/shot3270.png"
    },
    {
        title: "公開されている資料",
        items: [
            "[[link|http://fmhelp.filemaker.com/cloud/15/01/en/fmcgsg-aws|FileMaker Cloud Getting Started Guide]]",
            "[[link|http://fmhelp.filemaker.com/cloud/15/01/en/fmchelp|FileMaker Cloud Help]]",
            "[[link|http://help.filemaker.com/app/answers/detail/a_id/16088/|FileMaker Cloud Support]]"
        ]
    },
    {
        title: "FileMaker Cloud Technical Overview",
        fig1: "images/shot3269.png"
    },
    {
        title: "なぜ、クラウドサーバーか？",
        items: [
            "Linux版は多くのエンジニアが熱望",
            "-サーバーの運用環境が微妙になってきた",
            "--WindowsはServerのみ対応、OS XはServer.appだと大概はセットアップではまる",
            "-世間的には「サーバーは普通にLinux」という感覚",
            "ソフトウエアの配布はサポートコストが増大",
            "-Linuxと呼べるOSは多数あり、利用者が自分でセットアップするとなればサポートが大変",
            "-AMIをベースにしたOSでしか動かないようにすることで、セットアップのトラブルはほぼ皆無",
        ]
    },
    {
        centertitle: "FileMaker Cloud[[BR]]登場後の今後を占う"
    },
    {
        title: "カスタムWebからWeb APIへ",
        items: [
            "カスタムWeb",
            "-XMLあるいはPHP共有。GETメソッドとXMLで得られる結果",
            "-データベースモデルがFM7以前のものもまだ利用できる",
            "-更新されている面もあるが、古い仕様が色濃く残りやや放置に近い状態",
            "FileMaker Data API (予測)",
            "-いわゆるREST API、GET/POST/PUTでのリクエスト",
            "-JSONによる送信/受信データの扱い",
            "--カスタムWebに比べ、クライアントのJavaScriptから直接やりとりしやすい。サーバーサイドもプログラムを作りやすい",
            "-現在のデータベースモデルに合わせたクエリー発行を期待",
        ]
    },
    {
        title: "FileMakerでのWeb開発は？",
        items: [
            "Web Directはどうだろうか？",
            "-スピードも上がってきたが、ライセンスが必要という点で使用範囲は限られる",
            "-FLTにより、Web DirectよりもFileMaker Proでいい場面はさらに広がった？",
            "カスタムWebはいつまで使えるか？",
            "-まだ、deprecated technologyにはなっていない",
            "-しかし、Cloudに搭載される予定はなさそう",
            "-数年内でサーバーに搭載されなくなる可能性が高いのでは？",
            "FileMaker Data API",
            "-技術的に難しいところは全くない。FileMakerのエンジニアなら、1人が1週間で作れるレベルもの",
            "-おそらく、すでにあるのだが、ビジネスモデルが決められないので、出せないだけではないか？？",
        ]
    },
    {
        title: "OAuthは何か？ [予測のみ]",
        items: [
            "ディレクトリサービスに変わる認証基盤",
            "-1つのアカウントで複数の領域の認証を利用できるようにする技術",
            "-データベースをまたがる認証が安全にできる",
            "-Web DirectとFileMaker Proで認証を引き継げるなどが技術的には可能と思われる",
            "OAuthならGoogleやFacebookのアカウントでデータベースにログインできるか？",
            "-これは一見すると便利な機能かも? 敢えてやらないと考えられる",
            "-最近はそういうサイトが多いが、利用者制限する時には「誰でも認証できるけど使えない人がいる」状況を作るのが実はちょっと面倒",
        ]
    },
    {
        title: "まとめ",
        items: [
            "Linux版のFileMaker ServerがAWSで使える",
            "-待ちに待ったLinux版でありクラウド対応",
            "-サーバー構築の選択肢は広がった",
            "残念ながら、日本のユーザーはまだ使えない",
            "-アクティベーションされないが、課金はされる",
            "FileMakerを使ったWebアプリ開発の変化が始まった?!",
            "-カスタムWebはなくなり、FileMaker Data APIが先々で搭載予定",
            "[[IMGFLOW|images/im-logo.png]]もちろん、INTER-MediatorはData APIにも対応！",
            "-EC2にINTER-Mediatorを入れてクラウドサーバー運用できるよ",
        ]
    }
];

