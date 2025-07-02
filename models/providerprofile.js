'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class providerProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      providerProfile.belongsTo(models.user,{foreignKey:'userId',as:'user'})
    }
  }
  providerProfile.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    businessName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    about:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    phone:{
      type:DataTypes.STRING,
      allowNull:false
    },
    location:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    availableDays:{
      type:DataTypes.STRING,
      allowNull:false
    },
    startTime:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    endTime: {
      type:DataTypes.TEXT,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'providerProfile',
    tableName:'providerProfiles',
    timestamps:true
  });
  return providerProfile;
};