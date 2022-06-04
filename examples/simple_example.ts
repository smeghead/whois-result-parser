namespace Example {
    const WhoisResultParser = require('../src/whois-result-parser');
    const whoisResult = `
[ JPRS database provides information on network administration. Its use is    ]
[ restricted to network administration purposes. For further information,     ]
[ use 'whois -h whois.jprs.jp help'. To suppress Japanese output, add'/e'     ]
[ at the end of command, e.g. 'whois -h whois.jprs.jp xxx/e'.                 ]

Domain Information: [ドメイン情報]
[Domain Name]                   NTT.JP

[登録者名]                      日本電信電話株式会社
[Registrant]                    NIPPON TELEGRAPH AND TELEPHONE CORPORATION

[Name Server]                   
[Signing Key]                   

[登録年月日]                    2001/05/09
[有効期限]                      2022/05/31
[状態]                          Active
[最終更新]                      2021/06/01 01:05:09 (JST)

Contact Information: [公開連絡窓口]
[名前]                          日本電信電話株式会社
[Name]                          NIPPON TELEGRAPH AND TELEPHONE CORPORATION
[Email]                         nic@hco.ntt.co.jp
[Web Page]                       
[郵便番号]                      100-8116
[住所]                          東京都千代田区大手町1-5-1
                                大手町ファーストスクエア イーストタワー 20階
[Postal Address]                East Tower 20th Floor Otemachi First Square
                                1-5-1 Otemachi Chiyoda-ku
                                Tokyo Japan
[電話番号]                      03-6838-5590
[FAX番号]                       03-6838-5529
    `
    const parser = new WhoisResultParser('ntt.jp', whoisResult)
    console.log(parser.parse())
// {
//   domainName: 'NTT.JP',
//   updatedDate: '2021-06-01T01:05:09+00:00',
//   creationDate: '2001-05-09T00:00:00+00:00',
//   expirationDate: '2022-05-31T00:00:00+00:00'
// }

}

