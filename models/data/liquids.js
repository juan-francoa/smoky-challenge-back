let liquids = [
  {
    name: "Cushman Mango Grape",
    photo:
      "https://c8i3h4h6.rocketcdn.me/wp-content/uploads/2018/04/cush-man-series-mango-grape.jpg",
    category: "Cold",
    description:
      "The cold combination of Mango and Grape will create a new type of unique yet exotic flavor that will electrocute your tongue and make your sense of taste tingle.",
    amount: 3,
    price: 15,
  },
  {
    name: "Cushman Mango Banana",
    photo:
      "https://cdn.awsli.com.br/600x450/559/559441/produto/32343575/af8b475255.jpg",
    category: "Cold",
    description:
      "The chilled mix of banana and mango creates a unique flavor that will definitely blow you away.The flavor will still linger even after you pop it.",
    amount: 4,
    price: 15,
  },
  {
    name: "Nasty Juice Bad Blood",
    photo:
      "https://puntovape.com/image/cache/catalog/Eliquids/Nasty/nasty-juice-prefilled-bad-blood-60ml-20mg-5050-600x600.jpg",
    category: "Cold",
    description:
      "Nasty Juice's Bad Blood liquid is one of the most sought after fruity flavors. The sweet taste of blackcurrant mixed with a soft touch of mint results in a magnificent sensation of freshness.",
    amount: 7,
    price: 15,
  },
  {
    name: "Nasty Juice Green Apple",
    photo:
      "https://vaporplanet.online/wp-content/uploads/2018/08/GREEN-APPLE-Nasty-Juice-50ml-y-Nicokit-Gratis.png",
    category: "Cold",
    description:
      "This Nasty Juice Green Apple Aroma achieves a smooth, tasty and fresh green apple flavor.Balance between sweetness and acidity of the green apple.",
    amount: 4,
    price: 10,
  },
  {
    name: "Core Strawberry Apple",
    photo:
      "https://puntovape.com/image/cache/catalog/Eliquid/dinner/Core-by-DINNER-LADY-Strawberry-A-600x600.jpg",
    category: "Frutal",
    description:
      "Strawberry Apple by Core by Dinner Lady 120ml are succulent green and red apples, mixed with rich and full- bodied candied strawberries",
    amount: 5,
    price: 15,
  },
  {
    name: "Core Tropic Thunder",
    photo:
      "https://puntovape.com/image/cache/catalog/Eliquid/dinner/Core-by-DINNER-LADY-Tropic-Thund%20(1)-600x600.jpg",
    category: "Frutal",
    description:
      "Core by Dinner Lady Tropic Thunder 120ml is an electric fusion of tropical fruits! Top notes of rich pineapple, mango, and guava, through to middle notes of crisp apple, citrus, and sweet passion fruit!",
    amount: 5,
    price: 15,
  },
  {
    name: "Slow Blow Nasty Juice",
    photo:
      "https://static.wixstatic.com/media/d9d366_acfee95a00914155b14c2405a25ab2c4~mv2.jpg/v1/fill/w_440,h_440,al_c,q_85,usm_0.66_1.00_0.01/d9d366_acfee95a00914155b14c2405a25ab2c4~mv2.webp",
    category: "Frutal",
    description:
      "The flavor of pineapple layered with lemon soda that is sure to make you savor its freshness without getting bored! The thin slice of pineapple ensures that you enjoy inhaling every last drop.With its smooth and fresh taste, this juice is created for your daily vaping flavor.",
    amount: 6,
    price: 15,
  },
  {
    name: "Migos Moon Nasty Juice Ballin",
    photo:
      "https://static.wixstatic.com/media/d9d366_3eae10e025524a778d9db38fed01b071~mv2.jpg/v1/fill/w_440,h_440,al_c,q_85,usm_0.66_1.00_0.01/d9d366_3eae10e025524a778d9db38fed01b071~mv2.webp",
    category: "Frutal",
    description:
      "Nasty Juice Migos Moon liquid(Ballin Series Range) is a flavor of orange juice mixed with lemonade.The tangy taste of orange will refresh your mouth on the exhale.",
    amount: 2,
    price: 15,
  },
  {
    name: "Kings Crest Duchess Reserve",
    photo:
      "https://www.sweetch.ch/6597-home_default/kings-crest-duchess-reserve-100ml.jpg",
    category: "Dessert",
    description:
      "Kings Crest Duchess Reserve liquid is a creamy tres leches cake, to which a delicate butter caramel has been added with sweet and tasty marshmallows that will make it your favorite liquid.",
    amount: 5,
    price: 20,
  },
  {
    name: "Kings Crest Don Juan Tobacco Dulce",
    photo:
      "https://www.sweetch.ch/10038-home_default/kings-crest-don-juan-tobacco-dulce-100ml.jpg",
    category: "Dessert",
    description:
      "Blonde tobacco with a pecan pie, a hint of vanilla, chocolate and coconut.",
    amount: 3,
    price: 20,
  },
  {
    name: "Kings Crest Don Juan Reserve",
    photo:
      "https://www.sweetch.ch/6596-home_default/kings-crest-don-juan-reserve-100ml.jpg",
    category: "Dessert",
    description:
      "A pecan pie with a hint of vanilla, chocolate and coconut to top it all off.",
    amount: 2,
    price: 20,
  },
  {
    name: "Kings Crest Don Juan Coffe",
    photo:
      "https://www.sweetch.ch/6913-large_default/kings-crest---don-juan-cafe-100ml.jpg",
    category: "Dessert",
    description:
      "A delicious coffee with creamy milk, chocolate and sprinkled cocoa.The taste of coffee is predominant in this e - liquid.The chocolate and milk flavours give it a little something sweet but not sickening",
    amount: 4,
    price: 20,
  },
];

require("dotenv").config();
  require("../../config/database");
  const Liquid = require("../Liquid");
  
  liquids.forEach((element) => {
    Liquid.create({
      name: element.name,
      photo: element.photo,
      category: element.category,
      description: element.description,
      amount: element.amount,
      price: element.price,
    });
  });