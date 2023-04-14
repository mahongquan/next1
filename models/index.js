"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf(".") !== 0) && (file !== "index.js");
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });
db['Contact'] = sequelize.define(
  'Contact',
  {
    yonghu: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    addr: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    channels: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    yiqixinghao: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
    method: Sequelize.STRING,
    yiqibh: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    baoxiang: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    shenhe: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="审核")#审核
    yujifahuo_date: Sequelize.DATEONLY, // = models.DateTimeField(verbose_name="预计发货时间")#预计发货时间
    hetongbh: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
    tiaoshi_date: Sequelize.DATEONLY,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'parts_contact',
  }
);
db["Item"] = sequelize.define(
  'Item',
  {
    bh: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    name: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    guige: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    ct: Sequelize.INTEGER, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
    danwei: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    beizhu: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    image: Sequelize.STRING,
  },
  {
    timestamps: false,
    tableName: 'parts_item',
  }
);
//CREATE TABLE "todos_todo" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT
//, "text" varchar(100) NOT NULL, "completed" bool NOT NULL);
db["Todo"] = sequelize.define(
  'Todo',
  {
    text: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    completed:  Sequelize.BOOLEAN // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
  },
  {
    timestamps: false,
    tableName: 'todos_todo',
  }
);
db["Pack"] = sequelize.define(
  'Pack',
  {
    name: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
  },
  {
    timestamps: false,
    tableName: 'parts_pack',
  }
);
db["UsePack"] = sequelize.define(
  'UsePack',
  {
    //name:Sequelize.STRING,// models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    pack_id: Sequelize.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    contact_id: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'parts_usepack',
  }
);
db["UsePack"].belongsTo(db["Pack"], {
  foreignKey: 'pack_id',
});
db["UsePack"].belongsTo(db["Contact"], {
  foreignKey: 'contact_id',
});
db["PackItem"] = sequelize.define(
  'PackItem',
  {
    pack_id: Sequelize.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    item_id: Sequelize.INTEGER,
    ct: Sequelize.INTEGER,
    quehuo: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: 'parts_packitem',
  }
);
db["PackItem"].belongsTo(db["Item"], {
  foreignKey: 'item_id',
});
db["PackItem"].belongsTo(db["Pack"], {
  foreignKey: 'pack_id',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
