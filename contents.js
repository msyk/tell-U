/**
 * Created by msyk on 15/10/12.
 */

var config = {
    theme: "msyk1",
    transition: "fade",
    openParen: "#",
    closeParen: "#"
};

var contents = [
    {
        presubtitle: "プロとして通用するiOS開発者になろう! Section 4",
        maintitle: "マルチプロセス",
        subtitle: "hireLink vol.28",
        coveritems: [
            "2016年11月10日 (木) @ 株式会社トライブ",
            "##B|新居雅行　Masayuki Nii##",
            "独立系エンジニア, トレーナー, 博士(工学)",
            "##img|images/email.png|32px## nii@msyk.net " +
            "##img|images/facebook.png|32px## msyknii " +
            "##img|images/twitter.png|32px## msyk_nii"
        ]
    },
    {
        title: "自己紹介：新居雅行（にいまさゆき）",
        items: [
            "システム開発を行う自営業者",
            "-iOSやOS Xのネイティブアプリケーション",
            "-FileMakerのソリューション開発。特にカスタムWeb",
            "-データベース絡みのWebアプリケーション",
            "-コンサルティング、トレーニングコース開発、トレーナー",
            "-博士(工学)、Apple認定トレーナー",
            "iOSとの関わり",
            "-2008年、App Store開設時に『郵便番号検索』をリリース",
            "-その後、さまざまなiPhone/iPad向けのプロジェクトに参画",
            "-2012年よりナガセITスクールのトレーナー、コース開発を担当",
            "-技術評論社や自費出版など、iOS開発関連書籍を7冊執筆"
        ],
        fig3: "images/ios_programming_cover1.png",
        maximagewidth: 35
    },
    {
        title: "Agenda",
        items: [
            "-マルチスレッドプログラミング",
            "-同時処理が発生する上での問題点",
            "-iOSのフレームワークでの解決策",
            "##HR##本日のプログラム",
            "-https://github.com/msyk/iOS_Samples", "--others/MultiProcess"
        ]
    },
    {
        centertitle: "マルチスレッドプログラミング",
        centeritems: [
            "iOSでの並列処理", "スレッドではなくOperationを使う",
        ]
    },
    {
        title: "並列処理に対する要求や期待",
        items: [
            "並列処理(concurrent)と平行処理(paralell)",
            "-複数のプログラムが同時に実行状態になるのが並列処理",
            "-複数のプログラムが同時に実行するのが平行処理",
            "OSが持つ並列処理のための仕組みスレッド",
            "-プロセスはメモリの共有単位、スレッドはCPUの利用単位",
            "スレッドに期待すること",
            "-並列に処理が進むのならスピードアップする?",
            "-マルチコアだからマルチスレッド?",
            "-処理を分割できるのでプログラムの見通しが良くなる?",
            "-UIが応答しなくなるロックを避けることができる?"
        ]
    },
    {
        title: "iOSでの並列処理",
        items: [
            "UNIXのマルチスレッドPOSIX Threads",
            "-C言語ベースのAPI、OSの機能として提供されている",
            "Cocoa Thread",
            "-NSThread(Objective-C)、Thread(Swift)クラスで提供",
            "-NSObjectによるロック機能",
            "-[Apple Developer] Threading Programming Guide",
            "スレッドの代替機能",
            "-NSOperation / Operation オブジェクト",
            "-Grand Central Dispatch (GCD)",
            "-[Apple Developer] Concurrency Programming Guide",
        ]
    },
    {
        title: "スレッドではなくOperationを使う",
        items: [
            "Operationを使う積極的な理由",
            "-オブジェクト指向であり、フレームワーク内で完結している",
            "-キュー(OperationQueue)上で稼働する。キューを基本にして並列処理をコントロールできる",
            "-機能的には必要十分と考えられる",
            "-Operationを継承したクラスで、独自に仕組みを拡張できる",
            "Operationを使った上での不利な点",
            "-macOS/iOS上での独自の実装である。Java等での経験はそのままでは生かせられない",
            "-ネイティブな機能の利用ではないため、最大パフォーマンスではない",
            "-Dispatchフレームワークが最近実装されている（最後に紹介）",
        ]
    },
    {
        title: "Operation関連クラスの利用",
        items: [
            "OperationQueueクラス",
            "-オペレーションのキューのクラス、普通にインスタンスを作る",
            "-addOperation(_)メソッドで、オペレーションを追加すれば処理を実行",
            "Operationクラス",
            "-1つのタスクをクラスとして記述する",
            "-継承して利用することになるのが多いと思われる",
            "-継承クラスの1つがBlockOperationクラス",
            "--BlockOperation(init: {(Void)->Void in〜}) により生成可能",
            "現在のスレッド",
            "-Thread.current で取得可能、そのままprintすれば情報が得られる"
        ]
    },
    {
        centertitle: "同時処理が発生する上での問題点",
        centeritems: [
            "競合を避けるプログラミングの難しさ", "他のタスクが終わるのを待ちたい(同期の問題)"
        ]
    },
    {
        title: "同時に書き込みする問題(競合の問題)",
        items: [
            "変数やプロパティへの読み書き",
            "-並列処理がない場合は単純だが、並列処理により同時に書き込みが行われる場合がある",
            "-読み出しの後に書き込む場合もある",
            "-「処理途中の状態」が存在するもの一般に言える現象",
        ],
        fig3: "images/fig2.png"
    },
    {
        title: "Demo/競合とその回避",
        items: [
            "実際に競合が起きるプログラム",
            "-読み出しから書き込みまでをクリティカルセクションと呼ぶ",
            "競合しないようにするには？",
            "-ロックする。スレッドが利用中は、別のスレッドは利用できなくする",
            "--トイレの「使用中」表示のイメージ",
            "-オブジェクト(独立した/関連した)に記憶する",
            "--セマフォと呼ばれる整数カウンタの増加/減少での実装が直感的",
            "--ミューテックスという機構により複数タスクが同一のクリティカルセクションに入らないようにするモニタと呼ばれる手法",
            "-NSLockクラスがあるが、Swiftではobjc_sync_enter(obj)、objc_sync_exit(obj)を利用できる",
        ]
    },
    {
        title: "競合を避けるプログラミングの難しさ",
        items: [
            "可能性が少しでもあれば競合は発生する",
            "-高速実行しているため、低い確率かどうかは関係ない",
            "ロックは処理速度をかなり犠牲にする",
            "-デモで見た通り。粒度を調整するなどの最適化は必要",
            "ロック解除を忘れる/ロックしていないのに解除",
            "-ロックと解除を対で指定する必要があるが、複雑な状況では忘れがち",
            "デッドロック",
            "-お互いをロックし合うことで進めなくなる問題",
            "-「食事する哲学者の問題」が典型例として有名",
            "ロックそのものをロックする？",
            "-不可分性の保証やアトミック性などの表現でされる問題",
            "-CPUの機械語対応、デッカーのアルゴリズムなどがあるが、objc_sync_*() が問題なく動くと信じるしかない",
        ]
    },
    {
        title: "他のタスクが終わるのを待ちたい(同期の問題)",
        items: [
            "他のスレッドの処理が終了するのを待つ",
            "-Javaなら、Threadクラスのwait/notify/notifyAllメソッド",
            "-Objective-CのNSThread/SwiftのThreadにはこの種のメソッドが用意されていない",
            "iOSの場合の対処",
            "-オペレーションに依存関係を定義し、実質的に待ってから実行する",
            "--多段階になると、この方法はちょっとやりにくい",
            "-並列処理しない、つまり1スレッドのみしか稼働しないキューにするという方法もある",
            "原則として「待つ」処理はない方が良い",
            "-パフォーマンス低下あるいはUIを受け付けないなどのフリーズの原因になる"
        ]
    },
    {
        title: "Demo/別タスクの終了待ち",
        items: [
            "オペレーションを追加し、それらの終了を待つ",
            "-OperationQueueクラスのaddOperations(_, waitUntilFinished:)メソッド",
            "オペレーションの終了を待つ",
            "-OperationQueueクラスのwaitUntilAllOperationsAreFinished()メソッド",
            "タスクの実行順をオペレーション間の依存性で実現",
            "-OperationクラスのaddDependency()メソッド",
            "-引数のオペレーションが終了してから、メソッドを適用したペレーションが始まる",
            "並列度を1にする",
            "-OperationQueueクラスのmaxConcurrentOperationCountプロパティを1に",
        ]
    },
    {
        title: "Demo/別タスクの終了待ち",
        items: [
            "オペレーションのキャンセル",
            "-OperationQueueクラスのcancelAllOperations()メソッド",
            "-Operationクラスのcancel()メソッド",
            "オペレーション内部で別スレッドが動く場合",
            "-そのままでは並列処理されてしまい、依存度は関係なくなる",
            "-Operationを継承してオペレーションを拡張する",
        ]
    },
    {
        centertitle: "Operationの継承クラス",
        centeritems: [
            "Operationの継承クラスの要件", "プロパティの継承", "行う処理の実装", "内部でさらに別スレッド稼働する対処",
        ]
    },
    {
        title: "Operationの継承クラスの要件",
        items: [
            "プロパティの継承",
            "-Getterを持つisAsynchronousプロパティ、値は常にtrue",
            "-Getter/Setterを持つisExecutingプロパティ。別名のプロパティを利用して、読み書きができるようにして、falseに初期化",
            "-Getter/Setterを持つisFinishedプロパティ。こちらも読み書き可能に",
            "-isExecutingとisFinishedはKVO(Key-Value Observing)対応の必要がある",
            "メソッドの実装",
            "-マルチタスク非対応時に呼び出されるmainメソッドに実処理を実装",
            "-マルチタスク対応時に呼び出されるstartメソッドを実装するが、実質的にはmainメソッドを呼び出すのみ"
        ]
    },
    {
        title: "プロパティの継承",
        items: [
            "フラグは処理内で書き込みが発生する",
            "-各プロパティはOperationでGet-Onlyで定義されているため、そのまま継承したら書き込みができない",
            "-そこでプライベートの読み書き可能なプロパティに対するSetter/Getterを定義して、書き込みできるようにする",
        ],
        fig3: "images/code1.png"
        //fig3: "images/code2.png"
    },
    // {
    //     title: "プロパティの継承(ソースコード)",
    //     items: [
    //         ["-##highlight|swift|" +
    //         "class DownloadOperation: Operation {",
    //             "  override init() {",
    //             "    self._executing = false",
    //             "    self._finished = false",
    //             "    super.init()",
    //             "  }",
    //             "  private var _executing: Bool",
    //             "  private var _finished: Bool",
    //             "",
    //             "  override var isAsynchronous: Bool {",
    //             "    get {",
    //             "      return true",
    //             "    }",
    //             "  }",
    //             "",
    //             "  override var isExecuting: Bool {",
    //             "    get {",
    //             "      return self._executing",
    //             "    }",
    //             "    set(value) {",
    //             "      self._executing = value",
    //             "    }",
    //             "  }",
    //             "",
    //             "  override var isFinished: Bool {",
    //             "    get {",
    //             "      return self._finished",
    //             "    }",
    //             "    set(value) {",
    //             "      self._finished = value",
    //             "    }",
    //             "  }",
    //             "##"].join("\n")
    //     ]
    // },
    {
        title: "行う処理の実装",
        items: [
            "処理前後にプロパティ変更を行う",
            "-ただし、KVO(Key-Value Observing)に対応した処理が必要",
            "-きちんとしないとキャンセル処理が稼働しない",
            ["-##highlight|swift|" +
            'override func start() {',
                '  self.willChangeValue(forKey: self.keyExecuting)',
                '  self._executing = true',
                '  self.didChangeValue(forKey: self.keyExecuting)',
                '',
                '  self.main()',
                '',
                '  self.willChangeValue(forKey: self.keyExecuting)',
                '  self.willChangeValue(forKey: self.keyFinished)',
                '  self._executing = false',
                '  self._finished = true',
                '  self.didChangeValue(forKey: self.keyExecuting)',
                '  self.didChangeValue(forKey: self.keyFinished)',
                '}',
                '',
                'override func main() {',
                '  downloadLargeFile() // 実際に行いたい処理',
                '}',
                "##"].join("\n")
        ]
    },
    {
        title: "処理の開始部分",
        items: [
            "cancelプロパティを監視してキャンセルに備える",
            "-デモではstart()メソッドや、urlSession(_,dataTask:,didReceive)メソッド内でチェック",
            ["-##highlight|swift|" +
            'override func start() {',
                '  if (self.isFinished)    {',
                '    self.willChangeValue(forKey: self.keyFinished)',
                '    self._finished = true',
                '    self.didChangeValue(forKey: self.keyFinished)',
                '  }',
                '  self.willChangeValue(forKey: self.keyExecuting)',
                '  self._executing = true',
                '  self.didChangeValue(forKey: self.keyExecuting)',
                '',
                '  self.main()',
                '}',
                '',
                'override func main() {',
                '  downloadLargeFile() // 実際に行いたい処理',
                '}',
                "##"].join("\n")
        ]
    },
    {
        title: "内部でさらに別スレッド稼働する対処",
        items: [
            "オペレーションの終了フラグを立てるメソッドを独立させる",
            "-メソッド名は任意でよく、別スレッドの先の処理が終わった時にこのメソッドを呼び出す",
            ["-##highlight|swift|" +
            'private let keyExecuting = "isExecuting"',
                'private let keyFinished = "isFinished"', '',
                'func finishMyOperation()    {',
                '  self.willChangeValue(forKey: self.keyExecuting)',
                '  self.willChangeValue(forKey: self.keyFinished)',
                '  self._executing = false',
                '  self._finished = true',
                '  self.didChangeValue(forKey: self.keyExecuting)',
                '  self.didChangeValue(forKey: self.keyFinished)',
                '}',
                "##"].join("\n")
        ]
    },
    {
        centertitle: "その他の話題",
        centeritems: [
            "メインスレッド", "Dispatchフレームワーク"
        ]
    },
    {
        title: "メインスレッド",
        items: [
            "アプリケーションに最初から用意されたスレッド",
            "-スレッド数の上限は1になっている",
            "-通常、何もスレッド関連処理を組み込まないとこのスレッドで動く",
            "-UIKitの一部の処理は、このスレッド上で稼働する必要がある",
            "取得方法",
            "-OperationQueue.main でメインキューを実行可能",
            ["-##highlight|swift|" +
            'OperationQueue.main.addOperation({',
                '  self.tableView.reload()',
                '})',
                "##"].join("\n")
        ]
    },
    {
        title: "Dispatchフレームワーク",
        items: [
            "iOS 8より利用できるフレームワーク",
            "-Objective-Cでは関数やタイプの定義が中心、Swiftはクラス定義",
            "DispatchQueueクラスによるキュー",
            "-並列処理や、順番に処理させることができる",
            "DispatchWorkItemクラスによる実行タスク",
            "-クロージャーを指定して生成する",
            "-キャンセルへの対応、通知処理の対応？",
            "オンラインマニュアルは未完成",
            "-関数定義だけの項目がまだある。全貌がわからない",
        ]
    },
    {
        title: "まとめ",
        items: [
            "-マルチタスクでは競合や同期の問題に取り組む必要がある",
            "-競合回避には、処理範囲を同時に2つのスレッドが取り合わないようにするロックが必要",
            "-スレッドをそのまま使えなくもないが、OperationQueue/Operationクラスに十分に機能がある",
            "-Operationの継承クラスを定義することで、処理内でさらに別スレッドでの並列処理が稼働するような場合でも対処できる",
        ]
    },
    {
        title: "参考サイト、文献",
        items: [
            "書籍",
            "-並行コンピューティング技法――実践マルチコア/マルチスレッドプログラミング",
            "--Clay Breshears著、千住治郎訳（オライリージャパン）",
            "Apple Developer(URL省略)",
            "-Threading Programming Guide",
            "-Concurrency Programming Guide",
            "-OperationQueue Class",
            "-Operation Class",
            "-Dispatch Framework",
            "サイト",
            "-Swift 世代の排他制御(Qiita)",
            "--http://qiita.com/codelynx/items/0ecd28c8a7da0a0e42b5",
            "-Swiftでクラスのreadonly propertyのoverride(Qiita)",
            "--http://qiita.com/aKunihiroIshiguro/items/1d453579b7f0ca2a50c9"
        ]
    }
];

