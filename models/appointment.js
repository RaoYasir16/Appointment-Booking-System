'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     appointment.belongsTo(models.user,{foreignKey:'userId',as:'customer'});
     appointment.belongsTo(models.user,{foreignKey:'providerId', as:'provider'});
     appointment.belongsTo(models.service,{foreignKey:'serviceId', as:'service'})
    }
  }
  appointment.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    providerId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    serviceId:{
      type:DataTypes.UUID,
      allowNull:false
    },
    appointmentDate:{
      type:DataTypes.DATE,
      allowNull:false
    },
    timeSlot:{
      type:DataTypes.STRING,
      allowNull:false
    },
    status:{
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled','completed'),
      allowNull: false,
      defaultValue:"pending"
    },
    notes:{
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'appointment',
    tableName:"appointments"
  });
  return appointment;
};