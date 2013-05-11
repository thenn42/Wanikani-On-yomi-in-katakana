// ==UserScript==
// @name Wanikani On'yomi in katakana
// @namespace thenn42.eu/userscripts
// @description Transforms any On'yomi reading in katakana on Wanikani
// @include     http://www.wanikani.com/*
// @version    0.6
// @run-at document-end
// @updateURL http://userscripts.org/scripts/source/167274.user.js
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

//console.info("test");


var maxLevel=38;
var KanjiList = [[],[["下",1],["力",1],["七",1],["入",1],["二",1],["三",1],["大",1],["山",1],["女",1],["九",1],["川",0],["人",1],["八",1],["十",1],["上",1],["一",1],["口",1],["工",1]],[["丸",0],["田",0],["文",1],["円",1],["土",1],["子",1],["小",1],["千",1],["丁",1],["才",1],["六",1],["右",0],["木",1],["水",1],["火",1],["白",1],["玉",0],["本",1],["立",1],["手",0],["目",0],["又",0],["四",0],["夕",0],["日",1],["月",1],["中",1],["正",1],["出",1],["々",0],["刀",1],["天",1],["犬",0],["王",1],["左",0],["石",0],["了",1],["五",1]],[["内",1],["元",1],["兄",0],["毛",1],["父",0],["牛",1],["公",1],["久",0],["切",1],["少",1],["太",1],["戸",0],["止",1],["外",1],["母",0],["矢",1],["万",1],["生",1],["広",0],["分",1],["用",1],["方",0],["友",1],["北",1],["冬",0],["半",1],["市",1],["引",0],["台",1],["古",1],["今",1],["心",1],["午",1]],[["平",1],["世",1],["打",0],["早",1],["年",1],["花",0],["他",1],["代",1],["氷",0],["皮",0],["央",1],["皿",0],["休",1],["先",1],["竹",0],["主",1],["糸",0],["耳",0],["虫",0],["町",1],["貝",0],["不",1],["仕",1],["車",1],["赤",0],["百",1],["村",0],["見",0],["足",1],["気",1],["名",1],["写",1],["礼",1],["申",0],["去",1],["字",1],["男",1],["号",1]],[["当",1],["多",1],["色",0],["考",0],["学",1],["羽",0],["米",1],["図",1],["形",1],["交",1],["同",1],["行",1],["西",1],["体",1],["声",0],["来",1],["言",1],["走",1],["谷",0],["雨",0],["空",1],["金",1],["草",0],["音",1],["青",1],["林",0],["回",1],["肉",0],["作",1],["里",0],["近",1],["池",0],["社",1],["会",1],["光",1],["売",0],["毎",1],["何",0],["角",0],["麦",0],["自",1],["弟",1]],[["後",1],["州",1],["夜",1],["姉",1],["妹",1],["直",1],["有",1],["亡",1],["化",1],["両",1],["向",1],["安",1],["血",1],["国",1],["明",1],["店",1],["知",1],["歩",1],["死",1],["南",1],["思",1],["室",1],["点",1],["科",1],["茶",1],["活",1],["海",1],["首",0],["全",1],["地",1],["羊",1],["前",1],["長",1],["画",1],["次",1],["京",1],["曲",1],["東",1],["星",0],["食",1]],[["強",1],["氏",1],["記",1],["以",1],["組",1],["付",0],["札",1],["未",1],["民",1],["由",1],["辺",1],["失",1],["必",1],["末",1],["家",1],["弱",1],["時",1],["校",1],["夏",0],["紙",0],["通",1],["教",1],["理",1],["魚",1],["黒",1],["鳥",1],["船",1],["雪",0],["黄",0],["週",1],["欠",1],["風",1],["高",1]],[["道",1],["者",1],["場",0],["身",1],["朝",0],["対",1],["局",1],["支",1],["君",1],["住",1],["決",1],["役",1],["投",0],["究",1],["研",1],["買",0],["馬",1],["森",0],["絵",1],["楽",1],["話",1],["雲",0],["数",1],["所",1],["電",1],["合",0],["反",1],["間",1],["答",0],["番",1],["医",1],["助",1]],[["実",1],["始",0],["乗",0],["仮",1],["定",1],["県",1],["負",1],["待",0],["重",1],["表",1],["物",0],["予",1],["使",1],["勝",1],["苦",1],["泳",0],["具",1],["送",1],["持",0],["部",1],["相",1],["屋",1],["服",1],["要",1],["度",1],["談",1],["美",1],["新",1],["和",1],["返",1],["界",1],["発",1],["客",1],["事",1],["受",0]],[["配",1],["起",0],["歌",1],["農",1],["鉄",1],["終",1],["鳴",0],["親",1],["集",1],["酒",1],["速",1],["読",0],["業",1],["頭",0],["院",1],["飲",0],["落",1],["聞",1],["顔",0],["習",1],["調",1],["最",1],["転",1],["病",1],["軽",0],["開",1],["線",1],["路",1],["運",1],["横",0],["進",1],["葉",0],["算",1],["漢",1],["語",1]],[["別",1],["味",1],["働",1],["利",1],["功",1],["戦",1],["令",1],["意",1],["位",1],["神",1],["洋",1],["成",1],["岸",1],["命",1],["競",1],["争",1],["追",0],["指",0],["放",1],["初",1],["低",1],["昔",0],["良",0],["好",1],["育",1],["便",1],["注",1],["拾",0],["仲",0],["特",1],["努",1],["伝",0],["共",1],["波",1],["級",1],["老",1],["労",1],["秒",1]],[["暑",0],["員",1],["族",1],["階",1],["湯",0],["章",1],["着",0],["短",1],["都",1],["野",1],["寒",0],["第",1],["倍",1],["深",1],["温",1],["泉",1],["庭",1],["祭",0],["動",1],["息",1],["根",1],["流",1],["商",1],["島",0],["登",1],["悪",1],["球",1],["童",1],["悲",0],["植",1],["期",1],["歯",0],["勉",1],["旅",1],["港",1],["陽",1],["消",1]],[["皆",0],["宿",1],["練",1],["駅",1],["願",1],["感",1],["暗",1],["詩",1],["器",1],["銀",1],["熱",1],["館",1],["士",1],["標",1],["課",1],["然",1],["賞",1],["輪",1],["選",1],["鏡",0],["謝",1],["映",1],["問",1],["様",0],["整",1],["想",1],["橋",0],["福",1],["題",1],["情",1],["殺",1],["億",1],["料",1],["緑",0],["養",1],["疑",1],["像",1]],[["松",1],["念",1],["例",1],["協",1],["季",1],["固",1],["完",1],["周",1],["求",1],["的",1],["技",1],["格",1],["能",1],["私",1],["骨",1],["卒",1],["囲",1],["望",1],["約",1],["基",1],["性",1],["術",1],["頑",1],["参",1],["残",1],["芸",1],["雰",1],["材",1],["折",1],["妥",1],["希",1],["束",1]],[["法",1],["寺",0],["飯",1],["式",1],["単",1],["夫",1],["列",1],["秋",0],["帰",0],["岩",0],["春",0],["昼",0],["晴",0],["計",1],["区",1],["坂",0],["司",1],["泣",0],["軍",1],["猫",0],["紀",1],["建",1],["築",1],["英",1],["信",1],["変",1],["仏",1],["勇",1],["浅",0],["毒",1],["晩",1],["昨",1]],[["品",1],["存",1],["曜",1],["専",1],["面",1],["冒",1],["遠",0],["園",1],["幸",1],["阪",1],["真",1],["守",1],["急",1],["箱",0],["荷",0],["典",1],["喜",0],["府",1],["治",1],["笑",0],["辞",1],["保",1],["取",0],["弁",1],["政",1],["留",1],["証",1],["書",1],["門",1],["危",1],["係",1],["関",1],["険",1],["浴",0],["冗",1]],[["原",1],["細",0],["署",1],["敗",1],["兵",1],["説",1],["恋",1],["幻",1],["栄",1],["鼻",0],["堂",1],["席",1],["塩",0],["結",1],["無",1],["果",1],["梅",0],["干",1],["識",1],["非",1],["渉",1],["虚",1],["是",1],["官",1],["因",1],["愛",1],["底",0],["察",1],["側",0],["覚",1],["警",1],["薬",1],["常",1]],[["煙",1],["訓",1],["許",1],["弓",1],["汽",1],["祈",1],["喫",1],["座",1],["等",1],["報",1],["句",1],["験",1],["僧",1],["告",1],["胸",0],["洗",1],["枚",1],["達",1],["可",1],["脳",1],["類",1],["種",1],["試",1],["忘",1],["禁",1],["静",1],["禅",1],["借",1],["焼",0]],[["絡",1],["加",1],["笛",1],["史",1],["易",1],["改",1],["昆",1],["連",1],["比",1],["順",1],["減",1],["節",1],["若",0],["財",1],["布",1],["容",1],["閥",1],["冊",1],["舌",0],["宙",1],["混",1],["暴",1],["団",1],["履",1],["忙",0],["乱",1],["得",1],["徒",1],["困",0],["善",1],["続",1],["宇",1],["歴",1],["詞",1]],[["確",1],["震",1],["飛",1],["災",1],["妨",1],["率",1],["産",1],["在",1],["圧",1],["嫌",1],["械",1],["経",1],["防",1],["犯",1],["妻",1],["夢",1],["裕",1],["臭",0],["倒",1],["穴",0],["議",1],["害",1],["被",1],["尾",1],["尻",0],["論",1],["罪",1],["難",1],["機",1],["余",1],["個",1],["厚",0]],[["判",1],["資",1],["省",1],["権",1],["制",1],["評",1],["設",1],["任",1],["素",1],["批",1],["検",1],["条",1],["際",1],["敵",1],["増",1],["責",1],["挙",1],["査",1],["務",1],["件",1],["総",1],["岡",0],["派",1],["断",1],["認",1],["義",1],["解",1],["税",1],["審",1],["委",1],["済",1],["企",1]],[["寝",0],["脱",1],["応",1],["誕",1],["提",1],["坊",1],["置",1],["案",1],["宮",0],["勢",1],["費",1],["統",1],["営",1],["姿",1],["値",0],["態",1],["罰",1],["状",1],["賀",1],["過",1],["援",1],["域",1],["吸",1],["副",1],["策",1],["藤",0],["示",1],["領",1],["観",1],["各",1],["価",1]],[["停",1],["贅",1],["収",1],["師",1],["革",1],["導",1],["鬼",1],["看",1],["割",0],["施",1],["裁",1],["律",1],["準",1],["演",1],["崎",1],["護",1],["規",1],["秀",1],["宅",1],["幹",1],["呼",0],["張",1],["現",1],["沢",1],["俳",1],["城",0],["職",1],["乳",1],["備",1],["優",1],["則",1]],[["担",1],["燃",1],["販",1],["質",1],["株",0],["製",1],["額",1],["違",0],["狭",0],["届",0],["腰",0],["腕",0],["肩",0],["庁",1],["型",1],["層",1],["載",1],["触",1],["管",1],["差",1],["視",1],["量",1],["象",1],["境",1],["武",1],["述",1],["環",1],["供",1],["展",1],["祝",1],["輸",1]],[["巻",1],["輩",1],["候",1],["構",1],["効",1],["模",1],["替",0],["肥",1],["居",1],["含",1],["与",1],["限",1],["票",1],["況",1],["影",1],["渡",0],["響",1],["捕",1],["景",1],["抜",0],["掛",0],["逮",1],["訴",1],["訟",1],["属",1],["鮮",1],["補",1],["絞",1],["慣",1],["捜",1],["隠",1],["満",1],["豊",1]],[["豚",0],["接",1],["占",1],["振",1],["授",1],["針",0],["徴",1],["怪",1],["獣",1],["突",1],["汗",0],["再",1],["障",1],["刺",1],["鉛",1],["筆",1],["較",1],["河",1],["菓",1],["郵",1],["励",1],["討",1],["激",1],["我",1],["従",1],["故",1],["貯",1],["往",1],["創",1],["印",1],["造",1],["独",1],["復",1]],[["腹",1],["康",1],["屈",1],["貸",0],["訪",1],["誘",1],["途",1],["段",1],["怒",1],["眠",1],["迷",1],["暇",1],["極",1],["靴",0],["症",1],["給",1],["健",1],["端",1],["迫",1],["招",1],["胃",1],["就",1],["濃",1],["織",1],["郎",1],["退",1],["痛",1],["昇",1],["締",1],["惑",1],["悩",0],["睡",1]],[["攻",1],["綺",1],["微",1],["幼",1],["処",1],["絶",1],["浜",0],["衆",1],["庫",1],["巨",1],["妙",1],["婦",1],["凍",1],["冷",1],["児",1],["潔",1],["奇",1],["麗",1],["移",1],["逆",1],["稚",1],["博",1],["録",1],["清",1],["修",1],["隊",1],["券",1],["益",1],["精",1],["程",1],["憲",1],["並",1],["傘",0],["撃",1]],[["航",1],["緊",1],["請",1],["恐",1],["索",1],["添",1],["板",1],["街",1],["積",1],["壊",1],["杯",1],["監",1],["乾",1],["欧",1],["雄",1],["閣",1],["怖",1],["烈",1],["猛",1],["略",1],["娘",0],["宗",1],["寄",1],["韓",1],["僚",1],["江",0],["促",1],["催",1],["宴",1],["臣",1],["督",1],["診",1],["詰",0]],[["購",1],["乏",1],["詳",1],["盗",1],["騒",1],["懐",0],["遊",0],["系",1],["版",1],["預",1],["適",1],["貧",1],["背",1],["翌",1],["延",1],["越",1],["符",1],["婚",1],["旗",1],["渇",0],["魅",1],["更",1],["押",0],["覧",1],["快",1],["照",1],["飾",1],["漏",1],["浮",0],["枕",0],["撮",1]],[["墓",1],["掃",1],["離",1],["巣",0],["偵",1],["探",1],["徳",1],["富",1],["似",1],["均",1],["脈",1],["陸",1],["貨",1],["散",1],["帯",1],["驚",1],["粉",1],["嘆",1],["泥",1],["径",1],["孫",1],["倉",1],["廊",1],["尋",1],["幾",0],["除",1],["鑑",1],["豪",1],["普",1],["華",1],["編",1],["菜",1],["救",1],["棒",1],["既",1],["融",1]],[["捨",0],["液",1],["永",1],["恩",1],["秘",1],["訳",1],["机",0],["染",1],["暖",1],["欲",1],["厳",1],["汚",1],["党",1],["酸",1],["雑",1],["複",1],["祖",1],["込",0],["傷",1],["銭",1],["績",1],["序",1],["密",1],["卵",0],["飼",0],["賛",1],["衛",1],["興",1],["眼",1],["桜",0],["採",1],["志",1],["迎",1]],[["漠",1],["暮",1],["糖",1],["操",1],["筋",1],["賃",1],["裏",0],["装",1],["蒸",1],["諸",1],["蔵",1],["著",1],["肺",1],["砂",1],["盛",1],["異",1],["熟",1],["納",1],["忠",1],["尊",1],["宣",1],["灰",0],["敬",1],["拡",1],["宝",1],["垂",1],["否",1],["窓",0],["誌",1],["閉",1],["簡",1],["皇",1]],[["幕",1],["薦",1],["降",1],["刻",1],["損",1],["勤",1],["承",1],["沿",1],["揮",1],["推",1],["純",1],["縮",1],["芋",0],["隷",1],["奴",1],["吐",0],["丼",1],["貴",1],["臓",1],["誤",1],["腐",1],["爪",0],["枝",1],["豆",1],["劇",1],["源",1],["歓",1],["拝",1],["射",1],["磁",1],["聖",1],["紅",1],["粋",1],["縦",0]],[["恥",0],["油",1],["測",1],["彫",1],["噌",1],["醤",1],["湖",1],["払",0],["鍋",0],["獄",1],["杉",0],["寿",1],["剣",1],["互",1],["紹",1],["講",1],["厄",1],["為",1],["己",1],["炎",1],["彼",0],["亀",0],["介",1],["滞",1],["破",1],["舎",1],["酔",1],["酢",0],["汁",1],["銅",1],["熊",0],["遅",1]],[["換",1],["盟",1],["旧",1],["核",1],["摘",1],["諾",1],["依",1],["頼",1],["踏",1],["沖",0],["幅",0],["奈",1],["伸",0],["伎",1],["維",1],["継",1],["津",0],["縄",1],["及",1],["遺",1],["貿",1],["姓",1],["療",1],["献",1],["廃",1],["債",1],["将",1],["牙",1],["鹿",1],["般",1],["舞",1],["甘",0]],[["塁",1],["跳",1],["葬",1],["狙",1],["掲",1],["抱",0],["恵",1],["削",1],["臨",1],["香",1],["陣",1],["闘",1],["跡",1],["聴",1],["弾",1],["爆",1],["旬",1],["抵",1],["患",1],["崩",1],["契",1],["兆",1],["遣",1],["湾",1],["抗",1],["戻",0],["漁",1],["執",1],["募",1],["刑",1],["償",1],["昭",1]],[["還",1],["託",1],["盤",1],["抑",1],["房",1],["懸",1],["奥",1],["傾",1],["避",1],["繰",0],["宜",0],["齢",1],["需",1],["逃",1],["賂",1],["緩",0],["緒",1],["描",1],["択",1],["扱",0],["贈",1],["賄",1],["称",1],["慮",1],["却",1],["併",1],["伴",1],["刊",1],["奏",1],["致",1],["娠",1],["妊",1]]];
var hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゃゅょっ";
var katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダジズデドバビブベボパピプペポャュョー";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

if(/\/lattice\//.test(document.URL)) //lattice
{
	function DealWithLatticeLater(Node)
	{
        	Node.each(DealWithKanji)
            function DealWithKanji()
        	{
                if(IsOnyomi( $(this).text() ,0) )
                {
                $(this).attr( 'data-original-title',ConvertChain( $(this).attr('data-original-title') ) );
                }
        	}
    }
    
    waitForKeyElements(".lattice-single-character a[data-original-title]",DealWithLatticeLater,false);

}
else if( /\/kanji\//.test(document.URL) ) //kanji info pages
{
    $('.span6').each(findOnyomi);
    function findOnyomi()
    {
        if($(this).children('h3').text()=="On'yomi")
        {
            $(this).children('p').text(ConvertChain($(this).children('p').text())) ;
        }
    }
    
}
else if(/review\/session/.test(document.URL) ) //reviews
{
	function WhenAnswer()
	{
       if ($('#readings').children('h3').text() == "Important Readings (On'yomi)" )
   		 {
    	$('#readings').children('p').text(ConvertChain($('#readings').children('p').text()));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
	}
	$('#option-item-info').click(WhenAnswer);
	$(document).keydown(function(key){var letter = key.which || key.keyCode; if(letter == 70){ WhenAnswer();}});

}
else if(/\/level\//.test(document.URL)) //level page
{
  var level = /[0-9]+/.exec($('h1').eq(0).text() ); //get current level to minimize the number of kanji to lookup
    
    $('.single-character-grid').eq(1).find('a').each(DealWithKanji);
    function DealWithKanji()
    {
        if (IsOnyomi($(this).children('.character').text(),level))
        { 
        	$(this).find('li').eq(0).text( ConvertChain( $(this).find('li').eq(0).text() ) );
        }
    }
    
}
else if(/dashboard/.test(document.URL) || document.URL== "http://www.wanikani.com/") //Homepage
{
    var level = /[0-9]+/.exec($('.kanji-progress').children('h3').text() ); //get current level to minimize the number of kanji to lookup
    function DealWithDashboardLater(Node)
    {
        	Node.each(DealWithKanji)
            function DealWithKanji()
        	{
                if(IsOnyomi( $(this).text() ,level) )
                {
                $(this).attr( 'data-original-title',ConvertChain( $(this).attr('data-original-title') ) );
                }
        	}
    }
    
    waitForKeyElements(".kanji-progress a[data-original-title]",DealWithDashboardLater,false);
    
    
    
}
else if(/\/kanji\?difficult/.test(document.URL) ||document.URL== "http://www.wanikani.com/kanji") //big kanji pages
{
    //var firstLevelOnPage = parseInt( /[0-9]+/.exec($('.page-list').eq(0).find('a').text() ) );
    
    $('.single-character-grid').each(DealWithLevel);
    function DealWithLevel()
    {
        $(this).find('.character-item').each(DealWithKanji);
    }
    
    function DealWithKanji()
    {
        if (IsOnyomi($(this).find('.character').text(),0))
        { 
        	$(this).find('li').eq(0).text( ConvertChain( $(this).find('li').eq(0).text() ) );
        }
    }
        
    

}
else{}



function IsOnyomi(kanji,level) //level =0 -> all levels
{
    if(level !=0)
    {
	for (var i = 0, c = KanjiList[level].length; i < c; i++) 
    {
        if (kanji == KanjiList[level][i][0])
        {
            return KanjiList[level][i][1];//return 1 if onyomi or 0 if kunyomi
        }
    }
    }
    else
    {
        for (var LEVEL = 1; LEVEL <= maxLevel; LEVEL++)
        {
        	for (var i = 0, c = KanjiList[LEVEL].length; i < c; i++) 
   			{
        	if (kanji == KanjiList[LEVEL][i][0])
     	    {
            		return KanjiList[LEVEL][i][1];//return 1 if onyomi or 0 if kunyomi
        	}
   			}
        }
    }
    	return false;
    
}

function ConvertChain(chain)
    {
        for (var i = 0, c = chain.length; i < c; i++) 
        {
			chain = replaceAt(chain,i,ConvertHiraganaToKatakana(chain[i]));
    	}
        return chain;
    }


function ConvertHiraganaToKatakana(carac)
    {

        for (var i = 0, c = hiragana.length; i < c; i++) 
        	{
				if (carac==hiragana[i]) {return katakana[i];}
    		}
        
		return carac;
    }


function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}



/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
 
    Usage example:
 
        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );
 
        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }
 
    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;
 
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);
 
    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;
 
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }
 
    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];
 
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

    

