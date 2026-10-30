export const ROUTES = [
  {
    id: "capital",
    name: "大写灯塔",
    short: "句首大写",
    icon: "flag",
    color: "#df7956",
    animal: "fox",
    intro: "把第一个字母变大，亮起出发灯！",
    tip: "句子开头，用大写字母。",
    district: "向日葵山坡",
  },
  {
    id: "space",
    name: "空格小桥",
    short: "单词空格",
    icon: "bridge",
    color: "#48877e",
    animal: "bunny",
    intro: "单词挤在一起了，帮它们留一点距离。",
    tip: "两个单词之间，留一个空格。",
    district: "薄荷森林",
  },
  {
    id: "punctuation",
    name: "标点工坊",
    short: "句末标点",
    icon: "stamp",
    color: "#8580ad",
    animal: "bear",
    intro: "给句子盖上最后一枚标点印章。",
    tip: "句子写完了，记得句末的标点。",
    district: "紫莓花园",
  },
  {
    id: "letters",
    name: "独立送信",
    short: "完整句子",
    icon: "mail",
    color: "#c39539",
    animal: "cat",
    intro: "自己写好一封信，检查后就出发！",
    tip: "开头大写 · 单词空格 · 句末标点",
    district: "日落海岸",
  },
];

const BANK = {
  capital: [
    [
      "The sun is up.",
      "太阳升起来了",
      "太阳来信",
      "太阳醒啦！向日葵也开花了。",
      "sun",
    ],
    [
      "The cat can jump.",
      "小猫会跳跃",
      "跳跳比赛",
      "小猫准备好了，跳过小花丛！",
      "jump",
    ],
    [
      "The dog is happy.",
      "小狗很开心",
      "开心的礼物",
      "这封信带来了一个大大的惊喜！",
      "gift",
    ],
    [
      "The bird can sing.",
      "小鸟会唱歌",
      "森林音乐会",
      "小鸟开唱了，树叶也跟着摇摆。",
      "song",
    ],
    [
      "The fox has a hat.",
      "狐狸有顶帽子",
      "新帽子",
      "戴上帽子，狐狸要去野餐啦！",
      "hat",
    ],
    [
      "The frog can hop.",
      "青蛙会蹦跳",
      "池塘派对",
      "一蹦，再一蹦！派对开始了。",
      "jump",
    ],
    [
      "The moon is bright.",
      "月亮亮晶晶",
      "月亮晚安信",
      "月亮点亮了山坡上的小灯。",
      "moon",
    ],
    [
      "The stars shine.",
      "星星在闪耀",
      "星空邀请函",
      "一起躺在草地上，数数星星吧。",
      "stars",
    ],
  ],
  space: [
    [
      "The bunny is here.",
      "小兔子在这里",
      "森林报到",
      "小兔子赶来了，还带着一根胡萝卜。",
      "gift",
    ],
    [
      "The dog can run.",
      "小狗会奔跑",
      "小狗运动会",
      "小狗冲向终点，小旗子飘起来啦！",
      "jump",
    ],
    [
      "The fish can swim.",
      "小鱼会游泳",
      "池塘来信",
      "扑通！池塘里溅起了小水花。",
      "water",
    ],
    [
      "The cake is sweet.",
      "蛋糕甜甜的",
      "下午茶时间",
      "蛋糕送到了，快来一起吃下午茶。",
      "cake",
    ],
    [
      "The duck is wet.",
      "小鸭子湿漉漉",
      "雨天小客人",
      "小鸭子抖一抖，甩出亮亮的水珠。",
      "water",
    ],
    [
      "The tree is big.",
      "大树高高的",
      "大树的邀请",
      "树荫下刚好可以摆一张野餐垫。",
      "sun",
    ],
    [
      "The bear can dance.",
      "小熊会跳舞",
      "舞会开始啦",
      "转一个圈，小熊的舞会开场啦！",
      "song",
    ],
    [
      "The flowers are red.",
      "花朵是红色的",
      "开花的信",
      "森林里的花，一朵接一朵开放。",
      "flowers",
    ],
  ],
  punctuation: [
    [
      "The bear is sleepy.",
      "小熊困了",
      "一封晚安信",
      "小熊抱着枕头，甜甜地睡着了。",
      "moon",
    ],
    [
      "The gift is here.",
      "礼物送到了",
      "神秘礼物",
      "拆开信，礼物盒里的星星蹦出来了！",
      "gift",
    ],
    [
      "The tea is hot.",
      "茶是热的",
      "热乎乎的茶",
      "茶杯冒着小小的热气，吹一吹再喝。",
      "cake",
    ],
    [
      "Can the cat jump?",
      "小猫会跳吗？",
      "问问小猫",
      "小猫用力一跳，回答了你的问题！",
      "jump",
    ],
    [
      "Is the dog happy?",
      "小狗开心吗？",
      "问问小狗",
      "看！小狗高兴得尾巴摇成了风车。",
      "gift",
    ],
    [
      "The cake is big!",
      "这个蛋糕好大呀！",
      "巨型蛋糕",
      "哇！这么大的蛋糕，够大家一起吃。",
      "cake",
    ],
    [
      "Can the bird sing?",
      "小鸟会唱歌吗？",
      "点一首歌",
      "小鸟清了清嗓子，唱起一首小曲。",
      "song",
    ],
    [
      "The stars are bright!",
      "星星真亮呀！",
      "星星庆典",
      "好多闪闪的星星，今晚好漂亮！",
      "stars",
    ],
  ],
  letters: [
    [
      "The cat is happy.",
      "小猫很开心",
      "第一封独立来信",
      "小猫收到你的信，高兴地转了个圈。",
      "gift",
    ],
    [
      "The sun is warm.",
      "阳光暖暖的",
      "阳光明信片",
      "暖暖的阳光，照到了海边的小屋。",
      "sun",
    ],
    [
      "The dog can jump.",
      "小狗会跳跃",
      "修理一封来信",
      "修好的信送到了，小狗开始跳跃！",
      "jump",
    ],
    [
      "The boat is blue.",
      "小船是蓝色的",
      "蓝色小船",
      "蓝色小船出发了，去找远方的朋友。",
      "water",
    ],
    [
      "Is the cat happy?",
      "小猫开心吗？",
      "问候小猫",
      "小猫点了点头，送给你一朵小花。",
      "flowers",
    ],
    [
      "The cake is sweet.",
      "蛋糕甜甜的",
      "修理茶会请柬",
      "请柬修好了，大家都赶来吃蛋糕。",
      "cake",
    ],
    [
      "The bird can sing.",
      "小鸟会唱歌",
      "海岸音乐会",
      "歌声飘过海面，邮车也轻轻摇摆。",
      "song",
    ],
    [
      "The stars are bright!",
      "星星真亮呀！",
      "星空毕业信",
      "你的信点亮了整片星空！",
      "stars",
    ],
  ],
};

export function missionsFor(routeId) {
  return (BANK[routeId] || []).map(
    ([target, meaning, title, ending, effect], index) => {
      const repair = routeId === "letters" && (index === 2 || index === 5);
      let seed = "";
      if (routeId === "capital")
        seed = target[0].toLowerCase() + target.slice(1);
      if (routeId === "space")
        seed = index < 3 ? target.replace(" ", "") : target.replaceAll(" ", "");
      if (routeId === "punctuation") seed = target.slice(0, -1);
      if (repair)
        seed = (target[0].toLowerCase() + target.slice(1, -1)).replace(" ", "");
      return {
        id: `${routeId}-${index + 1}`,
        routeId,
        index,
        target,
        meaning,
        title,
        ending,
        effect,
        seed,
        repair,
      };
    },
  );
}
export const ALL_MISSIONS = ROUTES.flatMap((route) => missionsFor(route.id));
export const STAMPS = [
  ["sun", "早安太阳"],
  ["hat", "狐狸帽子"],
  ["moon", "晚安月亮"],
  ["stars", "星光信使"],
  ["bunny", "森林朋友"],
  ["cake", "甜甜下午茶"],
  ["flowers", "花园来信"],
  ["bridge", "森林小桥"],
  ["bear", "瞌睡小熊"],
  ["cat", "好奇小猫"],
  ["gift", "惊喜礼物"],
  ["song", "森林歌手"],
  ["mail", "第一封信"],
  ["water", "蓝色小船"],
  ["fox", "海岸邮差"],
  ["train", "星空邮车"],
];
