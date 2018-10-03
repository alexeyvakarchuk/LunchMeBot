const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const { leave } = Stage;

const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { sleep } = require("./utils");
const { token } = require("./config");
const { appId, appSecret } = require("./config").poster;

// *** Scene registration ***
const stage = new Stage();

const scenes = fs.readdirSync(path.join(__dirname, "scenes")).sort();

scenes.forEach(sceneName => stage.register(require(`./scenes/${sceneName}`)));

// *** Bot init ***
const bot = new Telegraf(token);

bot.use(session());
bot.use(stage.middleware());

bot.start(async ctx => {
  await ctx.reply(`Привет, ${ctx.chat.first_name}!`);
  // await sleep(2000);

  await ctx.reply("Меня зовут Сократ и я помогу тебе себя накормить😅");
  // await sleep(2000);

  await ctx.reply(
    "Ты можешь распланировать время ланчей в нашем заведении на неделю, и сразу же оплатить"
  );
  // await sleep(2000);

  await ctx.reply(
    "К твоему приходу заказ будет накрыт на столе, и тебе не придется ждать"
  );
  // await sleep(2000);

  await ctx.scene.enter("greeter");
});

// For all non-supportet phases
bot.on("text", ctx => {
  ctx.reply(
    `Ничего не понял. Я разбираюсь только в ланчах, остальное для меня темный лес 🌲`
  );
});

bot.startPolling();
