# Diplomacy Day — 18 November 2026

![Competition](https://make.fun/badge/news-image-20261118.svg)
![Rank](https://make.fun/badge/news-image-20261118/abduljunior425/news-image-18c/rank.svg)
![Reward](https://make.fun/badge/news-image-20261118/abduljunior425/news-image-18c/reward.svg)

A map-led front page summing up **Wednesday 18 November 2026** — a day when
diplomacy did the talking on four continents — entered in the
[news-image-20261118 bounty](https://make.fun/bounty/news-image-20261118) on
make.fun.

## The four pins on the map

- **1 · Manila — Quad reunites.** Trump, Modi, Takaichi and Albanese meet for
  the first Quad summit in over two years, agreeing critical-minerals deals
  and a first joint maritime patrol exercise for 2027, before Trump heads to
  Shenzhen for APEC and trilateral talks with Xi and Putin.
- **2 · Shenzhen — China–Canada thaw.** Xi and Carney agree around C$400m of
  tariff relief on Canadian pork and seafood exports, with Canada extending
  remission measures on Chinese steel and aluminium by two years.
- **3 · Jerusalem — Speaker flips.** The Knesset elects Yashar's Matan Kahana
  speaker 66–52, handing Eisenkot's camp control of the legislative agenda
  while his 28-day clock to form a government runs to 6 December.
- **4 · London — Sanctions bite.** Britain sanctions eight settlement
  construction firms and the Tzav 9 aid-blocking group with asset freezes and
  director disqualifications, days before the E1 tender deadline.

Footer: **COP31, Antalya** — the first draft deal comes under fire as
ministers take over the talks; fossil-fuel phaseout language and adaptation
finance of at least $120bn a year by 2035 are on the table, with the summit
due to close on Friday.

## How it runs

`main.ts` (Node, standard library only, no network) reads `entry.png` from
beside itself, writes it to `$MAKEFUN_OUTPUT_DIR` (default `/output`), then
re-reads the copy and fails loudly unless its SHA-256 matches the source —
so the two grader runs are byte-identical by construction.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`entry.png` is a 1024×1024 PNG, under 1 MiB. The base map was generated for
this entry and every word was typeset on top of it, so the text stays crisp
at any size.
