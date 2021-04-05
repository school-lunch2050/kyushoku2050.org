import { Ingredient, IngredientData, ingredients } from './ingredients'

export type Bubble =
  'fruit' |
  'rice' |
  'influencers' |
  'agreements' |
  'fisheries' |
  'ethical_consumption' |
  'social_businesses' |
  'mass_vegetables' |
  'insect_pollination' |
  'pesticide_resistant' |
  'weather_patterns' |
  'printed_product' |
  'climate_change' |
  'home_sprouts' |
  'plantation_farms' |
  'daily_supplements' |
  'controlled_market' |
  'pesticide_regulations' |
  'daily_medication' |
  'lab_meat' |
  'food_marketers' |
  'stressed_conditions' |
  'rare_fresh_fruit' |
  'public_food' |
  'food_literacy' |
  'seed_banks' |
  'domestic_soveirnty' |
  'permaculture' |
  'vegan_diets' |
  'wasting_food' |
  'regionally_diverse' |
  'preserving' |
  'limited_trade' |
  'no_pesticides'

type Language = 'en' | 'ja' | 'ja-simple'
interface Rect {
  x: number,
  y: number,
  width: number,
  height: number
}

interface BaseData {
  bubble: string | Rect,
  viewRect: Rect & { padding?: { left?: number, top?: number, bottom?: number, right?: number }},
  rect: Rect,
  infoButton?: 'right' | 'left',
  fontSize: number | Record<Language, number>,
  padding?: number | string,
  ingredients: Ingredient[],
  links: Array<{
    en?: string
    ja?: string
  }>
}

const baseData: Record<Bubble, BaseData> = {
  fruit: {
    bubble: '91 824 91 452 981 452 981 757.5 1087.39844 905.0859379999999 926.640625 809',
    viewRect: { x: 0, y: 428, width: 2073, height: 1138 },
    rect: { x: 91, y: 452, width: 890, height: 357 },
    fontSize: { en: 40, ja: 39, 'ja-simple': 40 },
    ingredients: [],
    links: [
      { en: 'https://asia.nikkei.com/Business/Luxury-Japanese-fruits-fetch-bushels-of-cash-in-greater-China' },
      { ja: 'https://www.maff.go.jp/j/keikaku/k_aratana/' },
      // old
      { ja: 'https://www.affrc.maff.go.jp/docs/press/200527.html' }
    ]
  },
  rice: {
    bubble: '2076 343 2775 343 2775 597 2076 597 2076 577.6992190000001 2017.6933589999999 526.675781 2076 539.521484',
    viewRect: { x: 1424, y: 250, width: 1381, height: 540 },
    rect: { x: 2076, y: 343, width: 699, height: 254 },
    fontSize: { en: 51, ja: 52, 'ja-simple': 31 },
    ingredients: ['rice'],
    links: [
      { en: 'https://apps.fas.usda.gov/newgainapi/api/report/downloadreportbyfilename?filename=Competitive%20Changes%20Expected%20in%20Japanese%20Rice%20Market_Tokyo_Japan_7-3-2018.pdf' },
      // old
      { ja: 'http://rice-assoc.jp/for-famer/32-cultivation/137-2018-09-16-13-13-59.html' }
    ]
  },
  influencers: {
    bubble: { x: 240, y: 1604, width: 775, height: 197 },
    viewRect: { x: 0, y: 1576, width: 1042, height: 924 },
    rect: { x: 240, y: 1604, width: 775, height: 197 },
    fontSize: { en: 36, ja: 34, 'ja-simple': 40 },
    ingredients: ['chicken_veggies', 'fish_soup'],
    links: [
      { en: 'https://www.brandwatch.com/blog/react-food-influencers-2017/' },
      // old
      { en: 'https://onezero.medium.com/how-google-got-its-employees-to-eat-their-vegetables-a2206820d90d' },
      { en: 'https://www.brandwatch.com/blog/react-food-influencers-2017/' },
      { en: 'https://www.fluentin3months.com/what-is-mukbang' },
      { en: 'https://m.youtube.com/watch?v=4EXVrzOACv4' },
      { en: 'https://www.forbes.com/sites/lizzysaxe/2018/12/07/are-food-influencers-the-restaurant-world/#4d6443f86ce1' }
    ]
  },
  agreements: {
    bubble: { x: 963, y: 2081, width: 710, height: 311 },
    viewRect: { x: 889, y: 1900, width: 1870, height: 600 },
    rect: { x: 963, y: 2081, width: 710, height: 311 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 35 },
    infoButton: 'right',
    padding: '25px 14px 8px 37px',
    ingredients: ['milk', 'chicken'],
    links: [
      { en: 'https://www.gfi.org/files/soti/INN-PBMED-SOTIR-2020-0507.pdf' },
      // old
      { en: 'https://www.perfectdayfoods.com/' },
      { en: 'https://geltor.com/technology/' },
      { en: 'https://www.clarafoods.com/' },
      { en: 'https://www.naturesfynd.com/' }
    ]
  },
  fisheries: {
    bubble: { x: 2343, y: 1387, width: 738, height: 255 },
    viewRect: { x: 1856, y: 1300, width: 1301, height: 623 },
    rect: { x: 2343, y: 1387, width: 738, height: 255 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 33 },
    padding: '10px 20px 10px 57px',
    ingredients: ['fish_soup_tofu'],
    links: [
      { en: 'http://www.fao.org/3/i3640e/i3640e.pdf' },
      // old
      { ja: 'https://news.yahoo.co.jp/byline/kodamakatsuya/20151115-00051465/' }
    ]
  },
  ethical_consumption: {
    bubble: { x: 1204, y: 1714, width: 715, height: 262 },
    viewRect: { x: 970, y: 1537, width: 988, height: 508 },
    rect: { x: 1204, y: 1714, width: 715, height: 262 },
    fontSize: { en: 36, ja: 27, 'ja-simple': 27 },
    padding: '18px 27px 0px 45px',
    ingredients: ['coffee_jelly'],
    links: [
      { en: 'https://www.japanfs.org/en/news/archives/news_id035745.html' },
      { ja: 'https://forbesjapan.com/articles/detail/33162' }
    ]
  },
  social_businesses: {
    bubble: '2283 620 3002 620 3002 780 2630.484375 780 2630.484375 856 2581.671875 780 2283 780',
    viewRect: { x: 2107, y: 593, width: 1050, height: 762 },
    rect: { x: 2283, y: 627, width: 719, height: 150 },
    fontSize: { en: 29, ja: 24, 'ja-simple': 24 },
    padding: '12px 15px 10px 27px',
    ingredients: ['fish_soup_onion'],
    links: [
      { en: 'https://asia.nikkei.com/Business/Business-trends/Japan-s-farmers-adopt-smart-technology-to-streamline-rice-growing' },
      { ja: 'https://agri.mynavi.jp/agriplus/vol_02/chapter01_02' },
      { ja: 'https://agrijournal.jp/renewableenergy/43611' },
      // old
      { en: 'https://smallfarmfuture.org.uk/2021/01/automation-and-a-small-farm-future' },
      { en: 'https://www.sciencedirect.com/science/article/pii/S0169204618300057' }
    ]
  },
  mass_vegetables: {
    bubble: '2376 349 2376 523 2042.521 523 2049.28125 589 1951.913 523 1482 523 1482 349',
    viewRect: { x: 1430, y: 297, width: 1727, height: 857 },
    rect: { x: 1482, y: 347, width: 893, height: 177 },
    fontSize: { en: 30, ja: 27, 'ja-simple': 31 },
    padding: '20px 43px',
    ingredients: ['autonoma_soup'],
    links: [
      { en: 'https://goodanthropocenes.net/urban-office-urban-farm/' },
      { ja: 'https://ideasforgood.jp/2019/10/04/data-center-aquaponics/' },
      // old
      { ja: 'https://aquaponics.co.jp/about-aquaponics/' },
      { en: 'https://www.isoe.de/en/news/news/news-all/news/bodenlos-nachhaltig-neuartige-landwirtschaftliche-pflanzenproduktion-mit-wasserwiederverwendung/' },
      { en: 'https://www.bangkokpost.com/business/1951488/firm-converts-arabian-desert-air-into-bottled-water' }
    ]
  },
  insect_pollination: {
    bubble: '2976 1163 2977 1403 2276 1403 2276 1386.371 2106.472656 1448 2275.999656 1287.191 2276 1163',
    viewRect: { x: 1471, y: 864, width: 1612, height: 1026 },
    rect: { x: 2277, y: 1161.5, width: 702, height: 243 },
    fontSize: { en: 26, ja: 23, 'ja-simple': 23 },
    padding: 41,
    ingredients: ['fruit_dumplings'],
    links: [
      {
        en: 'https://www.wired.com/story/robotic-pollinator/',
        ja: 'https://wired.jp/2018/05/29/robotic-pollinator/'
      }
    ]
  },
  pesticide_resistant: {
    bubble: '715 1578 715 1739 771.970703 1761 715 1788.35 715 1927 37 1927 37 1578',
    viewRect: { x: 0, y: 1391, width: 1579, height: 584 },
    rect: { x: 36, y: 1574, width: 680, height: 354 },
    fontSize: { en: 55, ja: 29, 'ja-simple': 42 },
    padding: '40px 30px',
    infoButton: 'right',
    ingredients: ['cricket_tofu'],
    links: [
      { en: 'https://www.researchgate.net/figure/Prediction-of-sales-of-insects-as-food-and-feed-from-open-data_fig1_319351283' },
      { ja: 'https://bugmo.jp/' },
      // old
      { en: 'https://thisismold.com/space/farm-systems/aketta-business-case-for-crickets#.WR0_asaRUuU' },
      // This is a search page, excluding it as it may confuse people { en: 'https://thisismold.com/?s=entomophogy' },
      { ja: 'http://mushi-sommelier.net/' },
      { ja: 'http://insectcuisine.jp/' },
      { ja: 'https://twitter.com/konenejapan' },
      { ja: 'https://entomo.jp/' },
      { ja: 'https://a-future-of-school-lunch.tumblr.com/' },
      { en: 'https://www.insectsforall.nl/en/projects/' }
    ]
  },
  weather_patterns: {
    bubble: '541.712891 2180.425781 578.387 2298.999781 1332 2299 1332 2472 476 2472 476 2299 505.037 2298.999781',
    viewRect: { x: 0, y: 1926.99999975, width: 1402, height: 573 },
    rect: { x: 476.429688, y: 2299.3125, width: 855, height: 173 },
    fontSize: { en: 36, ja: 39, 'ja-simple': 32 },
    ingredients: ['glaberrima_rice'],
    links: [
      { en: 'https://www.forbes.com/sites/gmoanswers/2016/09/29/gmos-help-address-climate-change/?sh=60817e1d38e6' },
      // old
      { en: 'https://www.sciencedirect.com/science/article/abs/pii/S1573521419301861' },
      { en: 'https://www.bbc.com/future/article/20171106-the-disease-that-could-change-how-we-drink-coffee' },
      { en: 'https://www.apsnet.org/edcenter/disandpath/fungalbasidio/pdlessons/Pages/SoybeanRust.aspx' },
      { en: 'http://www.fao.org/agriculture/crops/core-themes/theme/pests/wrdgp/en/' },
      { en: 'https://www.reuters.com/article/us-kenya-climate-locusts/climate-change-linked-to-african-locust-invasion-idUSKBN1ZS2HX' },
      { en: 'https://www.cabi.org/isc/datasheet/2747' },
      { en: 'https://blogs.cdfa.ca.gov/Section3162/?p=5843' },
      { en: 'https://www.grain.org/en/article/6240-the-rise-of-the-superbugs-and-why-industrial-farming-is-to-blame¥' },
      { en: 'https://en.wikipedia.org/wiki/Oryza_glaberrima' }
    ]
  },
  printed_product: {
    bubble: '3020 1563 3020 1918 2571.076 1918 2550.917969 1983.160156 2504.889 1918 2383 1918 2383 1563',
    viewRect: { x: 2324, y: 1487, width: 833, height: 725 },
    rect: { x: 2383.4296875, y: 1563.3125, width: 637, height: 356 },
    fontSize: { en: 42, ja: 40, 'ja-simple': 32 },
    ingredients: ['burdock_chips'],
    links: [
      { en: 'https://www.naturalmachines.com/' },
      // old
      { en: 'http://foodink.io/' },
      { en: 'https://www.techrepublic.com/article/heres-how-3d-food-printers-are-changing-the-way-we-cook/' },
      { en: 'https://8b10ca6f-73a6-4c2b-8880-fe23bdd9b08c.filesusr.com/ugd/bcbf64_74da776e3a124f1aa9e9bc117ca6d393.pdf' },
      // 404 { en: 'https://www.beehex.com/nutripo' },
      { en: 'https://matisiceland.org/' },
      { en: 'https://www.3dbyflow.com/' },
      {
        en: 'https://www.3dsystems.com/',
        ja: 'https://ja.3dsystems.com/'
      }
    ]
  },
  climate_change: {
    bubble: '1366.5 322.5 1366.5 577 834.975 577 793.081055 633.991211 793.081 577 696 577 696 322.5',
    viewRect: { x: 0, y: 236, width: 1438, height: 747 },
    rect: { x: 696, y: 322.3125, width: 671, height: 254 },
    fontSize: 32,
    ingredients: ['banana'],
    links: [
      { en: 'https://www.env.go.jp/earth/ondanka/knowledge/Stop2017e.pdf' },
      // old
      { ja: 'https://www.maff.go.jp/j/kanbo/kankyo/seisaku/pdf/pdf/3_gaiyou.pdf' },
      { ja: 'https://www.env.go.jp/en/earth/cc/wacc_080618.pdf' },
      { ja: 'https://www.maff.go.jp/e/data/publish/attach/pdf/index-94.pdf' },
      { ja: 'https://www.env.go.jp/en/earth/cc/wacc_080618.pdf' },
      { ja: 'https://www.env.go.jp/en/earth/cc/wacc_080618.pdf' },
      { ja: 'http://www.nies.go.jp/s4_impact/pdf/S-4_outline_2009.pdf' }
    ]
  },
  home_sprouts: {
    bubble: '1349.4 2120.3750005 1349.4 2333.3 1880.839844 2333.3 1960.351563 2326.212891 1960.351563 2310.792969 2030.2 2292.710938 1965.480469 2260.3 1965.480469 2114.5',
    viewRect: { x: 1308, y: 2079, width: 1849, height: 421 },
    rect: { x: 1349.429688, y: 2114.3125005, width: 617, height: 219 },
    fontSize: 37,
    padding: 25,
    infoButton: 'right',
    ingredients: ['soylent'],
    links: [
      { en: 'https://sproutpeople.org/seeds/sprout-mixes/' },
      { ja: 'https://media.365market.jp/post_detail.php?post_no=17931' },
      // old
      { en: 'https://futurefood.network/livinglabs/' },
      { en: 'https://soylent.com/' }
    ]
  },
  plantation_farms: {
    bubble: '1957 306 : 957 580 1349 580 1363.78125 654 1262.49219 580 1037 580 1037 306',
    viewRect: { x: 0, y: 265, width: 2020, height: 759 },
    rect: { x: 1037, y: 306, width: 920, height: 274 },
    fontSize: { en: 47, ja: 44, 'ja-simple': 44 },
    ingredients: [],
    links: [
      { en: 'https://www.tni.org/en/publication/the-global-land-grab' },
      { ja: 'https://www.jaicaf.or.jp/fileadmin/user_upload/publications/FY2016/wns_17spring.pdf' },
      // old
      { en: 'https://www.grain.org/en/article/6282-rcep-trade-deal-will-intensify-land-grabbing-in-asia' }
    ]
  },
  daily_supplements: {
    bubble: '3024 441 3024 709 2687.8 709 2687.804687 774.4 2643.5625 709 2176 709 2176 441',
    viewRect: { x: 2021, y: 400, width: 1136, height: 565 },
    rect: { x: 2176, y: 441, width: 848, height: 268 },
    fontSize: { en: 38, ja: 35, 'ja-simple': 38 },
    ingredients: ['supplements'],
    links: [
      { en: 'https://www.bbc.com/future/article/20120221-food-pills-a-staple-of-sci-fi' },
      { ja: 'https://emira-t.jp/ace/5280/' }
    ]
  },
  controlled_market: {
    bubble: '771.53125 1019.5 771.53125 1507.5 608.976562 1507.5 510.867187 1645.65625 525.5625 1507.5 58 1507.5 58 1019.5',
    viewRect: { x: 0, y: 996, width: 883, height: 1504 },
    rect: { x: 58, y: 1019, width: 714, height: 489 },
    fontSize: { en: 43, ja: 43, 'ja-simple': 34 },
    padding: '25px 42px 10px 32px',
    ingredients: ['nutrition_noodle'],
    links: [
      { en: 'https://www.oecd.org/agriculture/understanding-the-global-food-system/opportunities-and-threats-for-agriculture/' },
      // old
      { en: 'https://www.grain.org/en/article/5957-top-e-commerce-companies-move-into-retail' },
      { en: 'https://www.grain.org/en/article/5622-grow-ing-disaster-the-fortune-500-goes-farming' },
      { en: 'https://www.weforum.org/projects/new-vision-for-agriculture/' }
    ]
  },
  pesticide_regulations: {
    bubble: '1603.5 1024 1603.5 1408.5 1507.515625 1408.5 1446.4 1492 1422.875 1408.5 945 1408.5 945 1023.5',
    viewRect: { x: 840, y: 996, width: 1063, height: 807 },
    rect: { x: 945, y: 1023, width: 658, height: 385 },
    fontSize: { en: 45, ja: 39, 'ja-simple': 34 },
    padding: '20px 30px',
    ingredients: [],
    links: [
      { en: 'https://www.greenpeace.org/static/planet4-taiwan-stateless/2020/03/fcd30201-%E7%B6%A0%E8%89%B2%E5%92%8C%E5%B9%B3%E6%97%A5%E6%9C%AC%E8%BE%A6%E5%85%AC%E5%AE%A4%E8%AA%BF%E6%9F%A5%E5%A0%B1%E5%91%8A-%E7%A7%BB%E5%8B%95%E7%9A%84%E8%BC%BB%E5%B0%84-2020-radioactivity-on-the-move-2020.pdf' },
      { ja: 'https://www.greenpeace.org/japan/sustainable/story/2017/02/21/3230/' },
      { ja: 'https://www.kikonet.org/kiko-blog/2020-01-17/3842' }
    ]
  },
  daily_medication: {
    bubble: '2471 1024 2470.492188 1215.5 2003.578125 1215.5 2013.261719 1297.5 1943.832031 1215.5 1773.5 1215.5 1773.5 1023',
    viewRect: { x: 1710, y: 963, width: 1269, height: 549 },
    rect: { x: 1773, y: 1023, width: 697, height: 193 },
    fontSize: 34,
    ingredients: ['milk_cube'],
    links: [
      { en: 'https://www.japantimes.co.jp/news/2018/11/08/national/japan-urge-companies-curb-use-microplastics-amid-marine-pollution-crisis/' },
      { en: 'https://informatori.it/wp-content/uploads/2019/03/the-global-use-of-medicine-in-2019-and-outlook-to-2023.pdf' },
      { ja: 'https://answers.ten-navi.com/pharmanews/17796/' },
      { ja: 'http://www.scj.go.jp/ja/info/kohyo/kohyo-24-t288-1-abstract.html' }
    ]
  },
  lab_meat: {
    bubble: '3090.492188 1328 3090.492188 1484.5 2780.367188 1484.5 2751.367188 1547 2721.898438 1484.5 2605.5 1484.5 2605.5 1328.5',
    viewRect: { x: 2516, y: 1303, width: 641, height: 605 },
    rect: { x: 2605, y: 1328, width: 485, height: 156 },
    fontSize: 32,
    padding: 24,
    ingredients: ['fish_sausage'],
    links: [
      { en: 'https://gfi.org/science/the-science-of-cultivated-meat/' },
      { en: 'https://shiokmeats.com/' },
      { ja: 'https://web.archive.org/web/20190330122206/https://www3.nhk.or.jp/news/html/20190304/k10011835101000.html' },
      // old
      { en: 'https://www.newagemeats.com/' },
      { en: 'https://www.gfi.org/non-cms-pages/splash-sites/soi-reports/files/SOI-Report-Cell-Based.pdf' },
      { en: 'https://www.cubiqfoods.com/en/home/' },
      { ja: 'https://web.archive.org/web/20190314054009/https://www3.nhk.or.jp/news/html/20190304/k10011835101000.html' },
      { en: 'https://www.future-meat.com/' },
      { en: 'https://wildearth.com/pages/our-story' },
      { en: 'https://www.bluenalu.com/' },
      { en: 'https://www.thewildtype.com/' },
      { en: 'https://www.finlessfoods.com/' },
      { en: 'https://www.newwavefoods.com/' }
    ]
  },
  food_marketers: {
    bubble: '2475.492187 1456.5 2475.492187 1730.5 2378.742188 1730.5 2260.039062 1829 2303.609375 1730.5 1903 1730.5 1903 1456.5',
    viewRect: { x: 1603, y: 1435, width: 1054, height: 1065 },
    rect: { x: 1899, y: 1456, width: 576, height: 274 },
    fontSize: { en: 33, ja: 29, 'ja-simple': 30 },
    padding: 33,
    ingredients: ['gu_gu_bread'],
    links: [
      { en: 'https://soranews24.com/2020/12/09/rainbow-ramen-now-being-served-in-japan-to-spread-happiness-through-noodles%E3%80%90photos%E3%80%91/' },
      { en: 'https://data.worldobesity.org/' },
      // old
      { en: 'https://www.thelancet.com/pdfs/journals/lancet/PIIS0140-6736(18)31788-4.pdf' },
      { en: 'https://www.worldobesitydata.org/map/overview-adults' }
    ]
  },
  stressed_conditions: {
    bubble: '1588 1803.6079959 1588.010622 2026.6 969.589844 2026.6 945 2068.644531 930.6445313 2026.6 883 2026.6 883 1803.6',
    viewRect: { x: 840, y: 1776, width: 807, height: 724 },
    rect: { x: 885, y: 1803, width: 703, height: 223 },
    fontSize: { en: 23, ja: 26, 'ja-simple': 28 },
    ingredients: ['instant_soup'],
    links: [
      { en: 'https://www.syngenta.com/sites/syngenta/files/GRI/Syngenta-Sustainable-Business-Report-2018.pdf' },
      // old
      {
        en: 'https://www.syngenta.com/',
        ja: 'https://www.syngenta.co.jp/'
      },
      { en: 'https://calyxt.com/food/' },
      { en: 'https://pairwise.com/about-us/' },
      { en: 'https://www.memphismeats.com/' },
      { en: 'https://www.newagemeats.com/' },
      { en: 'http://plantedit.com/index.php/products/' },
      { en: 'https://www.inari.com/' },
      { en: 'https://cultiviansbx.com/about/' },
      { en: 'https://bensonhill.com/design-better-crops-together-benson-hill/crop-improvement-platform-cropos/' }
    ]
  },
  rare_fresh_fruit: {
    bubble: { x: 2473, y: 2198, width: 670, height: 141 },
    viewRect: { x: 2434, y: 1855, width: 723, height: 645 },
    rect: { x: 2473, y: 2198, width: 670, height: 141 },
    fontSize: 35,
    ingredients: ['pudding'],
    links: [
      { en: 'https://apps.fas.usda.gov/newgainapi/api/report/downloadreportbyfilename?filename=Japanese%20Fresh%20Fruit%20Market%20Overview%202018_Osaka%20ATO_Japan_10-30-2018.pdf' },
      { en: 'http://www.usdajapan.org/wpusda/wp-content/uploads/2018/05/FOOD-PROCESSING-SECTOR_Tokyo-ATO_Japan_4-13-2018.pdf' }
      // old
    ]
  },
  public_food: {
    bubble: '1474 829 1474 1024 1175 1024 1175 1099.5 1121.164062 1024 820 1024 820 829',
    viewRect: { x: 700, y: 794, width: 879, height: 611 },
    rect: { x: 820, y: 829, width: 654, height: 195 },
    fontSize: { en: 32, ja: 28, 'ja-simple': 30 },
    ingredients: ['fresh_salad'],
    links: [
      { en: 'https://www.cambridge.org/core/services/aop-cambridge-core/content/view/86C5DEFE7F7266C125316CECB6762875/9781107196933c16_327-350.pdf/seeds_of_the_future_in_the_present.pdf' },
      // old
      { en: 'https://goodanthropocenes.net/what-are-seeds' },
      { en: 'https://www.edibleschoolyard.org/' }
    ]
  },
  food_literacy: {
    bubble: '698 1200 698 997 115.367188 997 115.367188 913.429688 78 997 41 997 41 1200',
    viewRect: { x: -10, y: 344, width: 835, height: 1229 },
    rect: { x: 41, y: 997, width: 657, height: 203 },
    fontSize: { en: 39, ja: 33, 'ja-simple': 33 },
    ingredients: ['satoyama_soup'],
    links: [
      { en: 'https://edibleschoolyard.org/edible-education-home-classroom' },
      // old
      { en: 'https://www.scientificamerican.com/article/what-conservation-efforts-can-learn-from-indigenous-communities/' },
      { en: 'https://www.smithsonianmag.com/smithsonian-institution/new-way-stewardship-mother-earth-indigeneity-180952855/' },
      { en: 'https://www.nature.com/articles/s41893-018-0100-6' },
      { ja: 'https://www.pref.kanagawa.jp/docs/ar3/cnt/f6656/documents/887381.pdf' }
    ]
  },
  seed_banks: {
    bubble: '3044 248 3044 593 2339 593 2339 248',
    viewRect: { x: 1580, y: 223, width: 1550, height: 755 },
    rect: { x: 2339, y: 248, width: 705, height: 345 },
    fontSize: { en: 36, ja: 28, 'ja-simple': 29 },
    padding: 37,
    ingredients: ['proteins'/* , 'proteins_meat', 'proteins_fish' */],
    links: [
      { en: 'https://www.oxfamamerica.org/static/media/files/GCA_REPORT_EN_FINAL.pdf' },
      // old
      { en: 'http://patternsofcommoning.org/commons-in-the-pluriverse/' }
    ]
  },
  domestic_soveirnty: {
    bubble: '2394 801 2394 1088 1735 1088 1735 801',
    viewRect: { x: 1578, y: 600, width: 1579, height: 904 },
    rect: { x: 1735, y: 801, width: 659, height: 287 },
    fontSize: 30,
    padding: 40,
    ingredients: ['potato_porridge'],
    links: [
      { en: 'https://www.japanfs.org/en/news/archives/news_id028996.html' }
    ]
  },
  permaculture: {
    bubble: '3147 1659.5 3147 1975.5 2510 1975.5 2510 1659.5',
    viewRect: { x: 1442, y: 1319, width: 1715, height: 679 },
    rect: { x: 2510, y: 1660, width: 637, height: 315 },
    fontSize: { en: 32, ja: 29, 'ja-simple': 29 },
    padding: 40,
    ingredients: ['chestnut'],
    links: [
      { en: 'https://theecologist.org/2020/jan/24/rewilding-food-rewilding-farming' },
      // old
      { en: 'https://reasonstobecheerful.world/permaculture-bec-hellouin-farm-france/' },
      { en: 'http://www.regenvillages.com' },
      { en: 'https://alumni.columbia.edu/content/lo-tek-design-radical-indigenism' },
      { en: 'https://youtu.be/y8RojQZbsB8' },
      { en: 'https://www.jircas.go.jp/sites/default/files/publication/jarq/27-1-008-012_0.pdf' },
      { en: 'https://issuu.com/nzva/docs/vs_apr17_deathlysilence' },
      { en: 'http://morethanhumanlab.org/blog/project/counting-sheep-nz-merino-in-an-internet-of-things/' },
      { en: 'https://www.ciwf.org.uk/research/' },
      { en: 'https://www.tandfonline.com/doi/pdf/10.1080/09712119.2008.9706911' },
      { en: 'https://www.slowfood.com/what-we-do/themes/slow-meat/slow-meat-sustainable-livestock-farming/' }
    ]
  },
  vegan_diets: {
    bubble: '1354 1844.5 1354 1552.5 959.6 1552.5 975.5 1500.5 911 1552.5 713 1552.5 713 1844.5',
    viewRect: { x: 653, y: 1273, width: 824, height: 592 },
    rect: { x: 713, y: 1552.5, width: 641, height: 292 },
    fontSize: { en: 44, ja: 45, 'ja-simple': 29 },
    ingredients: ['proteins'],
    infoButton: 'right',
    links: [
      { en: 'https://news.globallandscapesforum.org/43337/12-alternative-proteins-for-climate-friendly-diets/' },
      // old
      { en: 'https://table.lifull.com/earthcuisine/' }
    ]
  },
  wasting_food: {
    bubble: '1659.5 1856.9181721 1659.5 1933.621094 1684.90625 1981.1875 1635.953125 1939.235368 1059.4921875 1939.235368 1059.4921875 1856.4882812',
    viewRect: { x: 1037, y: 1757, width: 954, height: 313 },
    rect: { x: 1059.5, y: 1856, width: 601, height: 85 },
    fontSize: { en: 23, ja: 18, 'ja-simple': 21 },
    padding: '20px 31px',
    ingredients: ['fresh_salad'],
    links: [
      { en: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0228369' },
      // old
      { en: 'https://daily.jstor.org/a-history-of-human-waste-as-fertilizer/' },
      { en: 'https://iwaponline.com/wpt/article-abstract/5/4/wpt2010096/21292/History-and-Current-Situation-of-Night-Soil' },
      { en: 'http://jsanic.org/inasia/japanhistoryx.html' },
      { en: 'https://humanurehandbook.com' }
    ]
  },
  regionally_diverse: {
    bubble: '49 2063.488281 707.882813 2063.488281 707.882813 2207.992188 756.1875 2247.5 707.882812 2280.117188 707.882813 2445.296875 49 2445.488281',
    viewRect: { x: 23, y: 1852, width: 1245, height: 618 },
    rect: { x: 49.5, y: 2063.488281, width: 658, height: 382 },
    fontSize: { en: 45, ja: 39, 'ja-simple': 41 },
    infoButton: 'right',
    ingredients: ['potato_porridge'],
    links: [
      { en: 'https://www.thelancet.com/pdfs/journals/lancet/PIIS0140-6736(18)31788-4.pdf' }
    ]
  },
  preserving: {
    bubble: '1918.49219 2247.5 1918.49219 2071.5 1410.9140630000002 2071.5 1349.320313 2008.78125 1368.085938 2071.5 1259.492187 2071.5 1259.492187 2247.5',
    viewRect: { x: 869, y: 1924, width: 1071, height: 375 },
    rect: { x: 1259.5, y: 2071.5, width: 659, height: 176 },
    fontSize: { en: 33, ja: 31, 'ja-simple': 32 },
    ingredients: ['fresh_salad'],
    links: [
      { en: 'https://www.sciencedirect.com/science/article/pii/S175646462030195X' }
    ]
  },
  limited_trade: {
    bubble: '2732 2250 2732 2389 2074 2389 2074 2250',
    viewRect: { x: 1921, y: 1921, width: 1236, height: 579 },
    rect: { x: 2074, y: 2250, width: 658, height: 139 },
    fontSize: { en: 21, ja: 21, 'ja-simple': 28 },
    padding: 20,
    ingredients: ['milk_bubble'],
    links: [
      { en: 'https://www.core77.com/posts/103634/Materiom-Open-Source-Recipes-for-How-to-Make-Your-Own-Raw-Materials-Out-of-Natural-Ingredients' },
      // old
      { en: 'http://www.oohowater.com/' },
      { en: 'https://www.wikihow.com/Make-Edible-Water-Bubbles' },
      { en: 'https://onezero.medium.com/kombucha-slime-is-an-edible-solution-to-the-worlds-plastic-problem-d1b87ce3085e' },
      { en: 'https://www.globalcitizen.org/en/content/lucy-hughes-fish-waste-plastic-alternative-london' }
    ]
  },
  no_pesticides: {
    bubble: '2025.010622 2290.6079959 2025.010622 2423.607996 1386.010622 2423.607996 1386.010622 2290.6079959',
    viewRect: { x: 1218, y: 2228, width: 838, height: 272 },
    rect: { x: 1386, y: 2290.6079959, width: 639, height: 133 },
    fontSize: { en: 33, ja: 23, 'ja-simple': 29 },
    padding: '20px 46px',
    ingredients: [],
    links: [
      { en: 'https://www.sciencedirect.com/science/article/abs/pii/S1872203218301641' }
    ]
  }
}

export interface BubbleData extends Omit<BaseData, 'ingredients'> {
  id: Bubble,
  // fontSize is normalized
  fontSize: Record<Language, number>
  // Ingredients are looked up
  ingredients: IngredientData[]
}

function prepareForHTML (bubbleKey: string, baseData: BaseData): BubbleData {
  let { fontSize } = baseData
  if (typeof fontSize === 'number') {
    fontSize = {
      en: fontSize,
      ja: fontSize,
      'ja-simple': fontSize
    }
  }
  const bubbleIngredients = baseData.ingredients.map(ingredient => ingredients[ingredient])
  return {
    ...baseData,
    id: bubbleKey as Bubble,
    fontSize,
    ingredients: bubbleIngredients
  }
}

export const bubbles = Object
  .entries(baseData)
  .reduce((mapped, [bubbleKey, baseData]) => {
    mapped[bubbleKey as Bubble] = prepareForHTML(bubbleKey, baseData)
    return mapped
  }, {} as Record<Bubble, BubbleData>)
