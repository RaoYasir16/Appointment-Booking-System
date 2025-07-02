'use strict';
const {
  Model,
  UUIDV4,
  UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.providerProfile,{foreignKey:'userId', as:'profile'});
      user.hasMany(models.service, { foreignKey: 'providerId', as: 'services' });
      user.hasMany(models.appointment,{foreignKey:'userId', as:'appointment'});
      user.hasMany(models.appointment,{foreignKey:'providerId',as:'providerAppointment'});
    }
  }
  user.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false

    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    role: {
      type: DataTypes.ENUM('admin', 'provider', 'user'),
      allowNull: false,
      defaultValue:'user'
    },
    isBanned:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName:"users",
    timestamps:true
  });
  return user;
};