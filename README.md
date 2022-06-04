# whois-result-parser #

## Usage ##

```javascript
    const WhoisResultParser = require('@smeghead/whois-result-parser');
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
// => {
//   domainName: 'NTT.JP',
//   updatedDate: '2021-06-01T01:05:09+00:00',
//   creationDate: '2001-05-09T00:00:00+00:00',
//   expirationDate: '2022-05-31T00:00:00+00:00'
// }

```

## Development Environment ##

open development shell.

```bash
docker-compose run --rm node sh
```

### initialize ###

```bash
npm init
npm install typescript
npx tsc --init
npm install --save-dev jest
npm install dayjs
```

## domains ##

 * com
 * net
 * org
 * edu
 * gov [not tested yet]
 * mil [not tested yet]
 * int
 * info
 * biz
 * name [not tested yet]
 * pro
 * museum
 * aero
 * coop
 * jobs [not tested yet]
 * travel [not tested yet]
 * mobi [not tested yet]
 * cat [not tested yet]
 * asia
 * tel
 * xxx [not tested yet]
 * post [not tested yet]

 * ac
 * ad [not tested yet]
 * ae [not tested yet]
 * af [not tested yet]
 * ag [not tested yet]
 * ai [not tested yet]
 * al [not tested yet]
 * am [not tested yet]
 * an [not tested yet]
 * ao [not tested yet]
 * aq [not tested yet]
 * ar [not tested yet]
 * as [not tested yet]
 * at [not tested yet]
 * au [not tested yet]
 * aw [not tested yet]
 * ax [not tested yet]
 * az [not tested yet]
 * ba [not tested yet]
 * bb [not tested yet]
 * bd [not tested yet]
 * be [not tested yet]
 * bf [not tested yet]
 * bg [not tested yet]
 * bh [not tested yet]
 * bi [not tested yet]
 * bj [not tested yet]
 * bl [not tested yet]
 * bm [not tested yet]
 * bn [not tested yet]
 * bo [not tested yet]
 * bq [not tested yet]
 * br [not tested yet]
 * bs [not tested yet]
 * bt [not tested yet]
 * bv [not tested yet]
 * bw [not tested yet]
 * by [not tested yet]
 * bz [not tested yet]
 * ca [not tested yet]
 * cc [not tested yet]
 * cd [not tested yet]
 * cf [not tested yet]
 * cg [not tested yet]
 * ch [not tested yet]
 * ci [not tested yet]
 * ck [not tested yet]
 * cl [not tested yet]
 * cm [not tested yet]
 * cn [not tested yet]
 * co [not tested yet]
 * cr [not tested yet]
 * cu [not tested yet]
 * cv [not tested yet]
 * cw [not tested yet]
 * cx [not tested yet]
 * cy [not tested yet]
 * cz [not tested yet]
 * de [not tested yet]
 * dj [not tested yet]
 * dk [not tested yet]
 * dm [not tested yet]
 * do [not tested yet]
 * dz [not tested yet]
 * ec [not tested yet]
 * ee [not tested yet]
 * eg [not tested yet]
 * eh [not tested yet]
 * er [not tested yet]
 * es [not tested yet]
 * et [not tested yet]
 * eu [not tested yet]
 * fi [not tested yet]
 * fj [not tested yet]
 * fk [not tested yet]
 * fm [not tested yet]
 * fo [not tested yet]
 * fr [not tested yet]
 * ga [not tested yet]
 * gb [not tested yet]
 * gd [not tested yet]
 * ge [not tested yet]
 * gf [not tested yet]
 * gg [not tested yet]
 * gh [not tested yet]
 * gi [not tested yet]
 * gl [not tested yet]
 * gm [not tested yet]
 * gn [not tested yet]
 * gp [not tested yet]
 * gq [not tested yet]
 * gr [not tested yet]
 * gs [not tested yet]
 * gt [not tested yet]
 * gu [not tested yet]
 * gw [not tested yet]
 * gy [not tested yet]
 * hk [not tested yet]
 * hm [not tested yet]
 * hn [not tested yet]
 * hr [not tested yet]
 * ht [not tested yet]
 * hu [not tested yet]
 * id [not tested yet]
 * ie [not tested yet]
 * il [not tested yet]
 * im [not tested yet]
 * in [not tested yet]
 * io [not tested yet]
 * iq [not tested yet]
 * ir [not tested yet]
 * is [not tested yet]
 * it [not tested yet]
 * je [not tested yet]
 * jm [not tested yet]
 * jo [not tested yet]
 * jp
 * ke [not tested yet]
 * kg [not tested yet]
 * kh [not tested yet]
 * ki [not tested yet]
 * km [not tested yet]
 * kn [not tested yet]
 * kp [not tested yet]
 * kr [not tested yet]


