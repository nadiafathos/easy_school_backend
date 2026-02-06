import { DataTypes } from "sequelize";

export default function eventModel(sequelize) {
  const Event = sequelize.define(
    "Event",
    {
      id_event: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      titre: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      lieu: DataTypes.STRING,
      materiel: DataTypes.STRING,
      cout: DataTypes.FLOAT
    },
    {
      tableName: "events",
      timestamps: true
    }
  );

  Event.associate = (models) => {
    Event.hasMany(models.ParticipationEvent, { foreignKey: "event_id" });
  };

  return Event;
}
