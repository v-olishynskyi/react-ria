import React, { useState, useEffect } from "react";
import Tabs from "./Tabs/Tabs";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import Axios from "axios";
import CarouselComponent from "./CarouselComponent/CarouselComponent";
import AddToWishlist from "../../components/AddToWishlist/AddToWishlist";
import { Col } from "reactstrap";

const API_KEY = process.env.REACT_APP_API_KEY;

// eslint-disable-next-line no-unused-vars
const obj = {
  total_square_meters: 67,
  floors_count: 10,
  type: "realty",
  photos: {
    "105896851": {
      file: "dom/photo/10589/1058968/105896851/105896851.jpg",
      ordering: 5,
      id: 105896851,
    },
    "105896852": {
      file: "dom/photo/10589/1058968/105896852/105896852.jpg",
      ordering: 6,
      id: 105896852,
    },
    "105896853": {
      file: "dom/photo/10589/1058968/105896853/105896853.jpg",
      ordering: 13,
      id: 105896853,
    },
    "105896980": {
      file: "dom/photo/10589/1058969/105896980/105896980.jpg",
      ordering: 16,
      is_main: 1,
      id: 105896980,
    },
    "105896981": {
      file: "dom/photo/10589/1058969/105896981/105896981.jpg",
      ordering: 15,
      id: 105896981,
    },
    "105896982": {
      file: "dom/photo/10589/1058969/105896982/105896982.jpg",
      ordering: 14,
      id: 105896982,
    },
    "105896983": {
      file: "dom/photo/10589/1058969/105896983/105896983.jpg",
      ordering: 17,
      id: 105896983,
    },
    "106762663": {
      file: "dom/photo/10676/1067626/106762663/106762663.jpg",
      ordering: 1,
      id: 106762663,
    },
    "106762665": {
      file: "dom/photo/10676/1067626/106762665/106762665.jpg",
      ordering: 2,
      id: 106762665,
    },
    "106762669": {
      file: "dom/photo/10676/1067626/106762669/106762669.jpg",
      ordering: 4,
      id: 106762669,
    },
    "106762672": {
      file: "dom/photo/10676/1067626/106762672/106762672.jpg",
      ordering: 3,
      id: 106762672,
    },
    "106762673": {
      file: "dom/photo/10676/1067626/106762673/106762673.jpg",
      ordering: 9,
      id: 106762673,
    },
    "106762675": {
      file: "dom/photo/10676/1067626/106762675/106762675.jpg",
      ordering: 10,
      id: 106762675,
    },
    "106762678": {
      file: "dom/photo/10676/1067626/106762678/106762678.jpg",
      ordering: 11,
      id: 106762678,
    },
    "106762679": {
      file: "dom/photo/10676/1067626/106762679/106762679.jpg",
      ordering: 12,
      id: 106762679,
    },
  },
  price_item: 8200,
  district_type_id: 1,
  youtube_link: "",
  description_uk:
    "Нестандартна двокімнатна квартира з шикарним видом на все місто за найнижчою ціною!!!\nЗдача будинку планується на кінець 2020 року.\nБудинок від надійної будівельної компанії.\nМожлива розстрочка до 2020 року.\nБудинок має зручне розташування, недалеко знаходиться школа, дитячий садок, продуктовий базар, лікарня. \nЗупинка громадського транспрорту біля будинку. В 15 хв ходьби знаходиться озеро, де ви зможете чудово відпочити в літній час. \nПрибудинкова територія буде включати в себе продуманий автомобільний паркінг, зони відпочинку, а також дитячі і спортивні майданчики. \nЛіфт в будинку буде функціонувати з поверху, що забезпечує зручність у використанні. \nНа момент здачі в квартирі будуть виконані внутрішні роботи:\n– Монтаж електромережі; \n– Штукатурка стін машинним нанесенням; \n– Підведені та підключені комунікації; \n– Встановлені лічильники; \n– Встановлений двоконтурний газовий котел на опалення квартири та підігрів води; \n– Металопластикові вікна в три скла, два з яких енергозберігаючі; \n– Засклені лоджії; \n– Металеві вхідні двері; \n– Виготовляємо документи на квартиру. \nФото реальні.  ",
  advert_type_name: "продажа",
  advert_type_id: 1,
  state_name: "Хмельницкая",
  flat_number: "",
  complete_time: 380.605,
  price: 549400,
  beautiful_url:
    "realty-perevireno-prodaja-kvartira-hmelnitskiy-dubovo-krasovskogo-marshala-pereulok-16450221.html",
  state_id: 4,
  longitude: 26.99883568515,
  photos_count: 15,
  inspected_at: "2019-12-20 12:32:21",
  user_ip: 0,
  is_calltracking: 1,
  kitchen_square_meters: 9.88,
  agency_id: 24434,
  date_end: "2020-07-12 04:48:22",
  web_id: "3f20348659da1ea5",
  living_square_meters: 31.76,
  realty_type_parent_name: "Жилье",
  inspected: 1,
  quality: 87,
  realty_type_id: 2,
  building_number_str: "31/1А",
  user_id: 7982501,
  currency_type: "грн",
  characteristics_values: {
    "118": 108,
    "209": 2,
    "214": 67,
    "216": 31.76,
    "218": 9.88,
    "227": 3,
    "228": 10,
    "234": 8200,
    "242": 240,
    "247": 253,
    "265": 257,
    "274": 274,
    "443": 1471,
    "475": 473,
    "480": 476,
    "505": 2.8,
    "516": 511,
    "629": 627,
    "709": 704,
    "907": 901,
    "940": 935,
    "1141": 1137,
    "1166": 1159,
    "1169": 1168,
    "1178": 1171,
    "1181": 1179,
    "1190": 1182,
    "1193": 1191,
    "1202": 1195,
    "1206": 1204,
    "1215": 1207,
    "1219": 1216,
    "1228": 1220,
    "1232": 1229,
    "1268": 1260,
    "1272": 1269,
    "1437": 1435,
    "1515": 1508,
    "1524": 1517,
    "1559": 1557,
    "1563": 1561,
    "1650": 1653,
  },
  price_type: "за кв.м.",
  _id: "realty-16450221",
  street_id: 7123,
  city_id: 4,
  price_total: 549400,
  realty_sale_type: 2,
  realty_id: 16450221,
  latitude: 49.406090117446,
  created_at: "2019-11-25 20:14:11",
  description:
    "Нестандартная двухкомнатная квартира с шикарным видом на весь город по самой низкой цене!!!\nСдача дома планируется на конец 2020 года.\nДом от надежной строительной компании.\nВозможна рассрочка до 2020 года.\nДом имеет комфортное расположение, недалеко находится школа, детский сад, продуктовый базар, больница. \nОстановка общественного транспрорту возле дома. В 15 мин ходьбы находится озеро, где вы сможете прекрасно отдохнуть в летнее время. \nПридомовая территория будет включать в себя продуманный автомобильный паркинг, зоны отдыха, а также детские и спортивные площадки. \nЛифт в доме будет функционировать с этажа, что обеспечивает удобство в его использовании. \nНа момент сдачи в квартире будут выполнены внутренние работы:\n– Монтаж электросети; \n– Штукатурка стен машинным нанесением; \n– Подведены и подключены коммуникации; \n– Установлены счетчики; \n– Установлен двухконтурный газовый котел на отопление квартиры и подогрев воды; \n– Металлопластиковые окна в три стекла, два из которых энергосберегающие; \n– Остекленные лоджии; \n– Металлические входные двери; \n– Изготавливаем документы на квартиру. \nФото реальные. ",
  levels_expired: "2020-04-15 03:32:59",
  is_commercial: 1,
  street_name: "пер. Красовского Маршала",
  district_name: "Дубово",
  is_exchange: "нет",
  city_name: "Хмельницкий",
  advert_publish_type: 1,
  realty_type_parent_id: 1,
  user_newbuild_name: "ЖК Avila Sky",
  floor: 3,
  district_type_name: "Район",
  main_photo: "dom/photo/10589/1058969/105896980/105896980.jpg",
  rooms_count: 2,
  advert_title: 1,
  rangeFactorAuction: "00033552792103983285",
  log_moderation_reason_publish: 6,
  wall_type: "кирпич",
  user_newbuild_id: 5355,
  realty_type_name: "Квартира",
  publishing_date: "2020-04-12 04:48:22",
  district_id: 15093,
  is_show_building_no: 1,
  user_package_id: 0,
  levels: 5,
  realtorVerified: true,
  user: {
    name: "Ярослав Довгань",
    image: "avatars/all/798/79825/7982501/7982501.jpg?v=1542794609",
    good_partner_top: "",
  },
  agency: {
    agency_id: 24434,
    name: "New House",
    logo: "dom/agence/2/244/24434/24434.jpg?v=1508137790",
    agency_type: 1,
    good_partner: "",
    user_id: 4764639,
  },
  priceArr: { "1": "20 163", "2": "18 460", "3": "549 400" },
  is_developer: 0,
  with_panoramas: 1,
  isBinotel: 1,
};

const Advertising = ({ match, location }) => {
  const slugId = match.params.slug;
  // eslint-disable-next-line no-unused-vars
  const [{ response, isLoading, error }, doFetch] = useFetch(`/info/${slugId}?api_key=${API_KEY}`);
  const [rate, setRate] = useState(null);
  const [, setSaved] = useState(JSON.parse(localStorage.getItem("savedItem")));

  const addToWishlist = React.useCallback(() => {
    const ls = localStorage.getItem("savedItem");
    let arr = JSON.parse(ls);

    if (arr) {
      if (arr.includes(slugId)) {
        arr.splice(arr.indexOf(slugId), 1);
      } else {
        arr.push(slugId);
      }
      localStorage.setItem("savedItem", JSON.stringify(arr));
    } else {
      localStorage.setItem("savedItem", JSON.stringify([slugId]));
    }

    setSaved(arr);
  }, [slugId]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    async function getRate() {
      try {
        const res = await Axios.get(
          "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
        );
        setRate(res.data);
      } catch (error) {
        console.warn(error);
      }
    }

    getRate();
  }, []);

  let rateUSD = null;
  rate && rate.map((item) => (item.ccy.toLowerCase() === "usd" ? (rateUSD = item.buy) : ""));

  // if (!isLoading && response) console.log(response);

  return (
    <>
      <Col className="pl-0" xs="1" onClick={addToWishlist}>
        <AddToWishlist location={location} id={slugId} />
      </Col>

      {!isLoading && response && (
        <h1>
          Продам {response.rooms_count}-x кімнатну квартиру в м. {response.city_name}{" "}
        </h1>
      )}
      {!isLoading && response && (
        <CarouselComponent
          photos={Object.values(response.photos).sort((a, b) => a.ordering - b.ordering)}
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && response && <Tabs objInfo={response} rate={rateUSD} />}
    </>
  );
};

export default Advertising;
