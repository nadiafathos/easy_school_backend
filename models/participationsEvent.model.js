import { DataTypes } from "sequelize";

export default function participationEventModel(sequelize) {
  const ParticipationEvent = sequelize.define(
    "ParticipationEvent",
    {
      id_participation: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      child_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      event_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      statut: {
        type: DataTypes.ENUM("autorisé", "refusé", "en attente"),
        defaultValue: "en attente"
      }
    },
    {
      tableName: "participation_events",
      timestamps: true
    }
  );

  ParticipationEvent.associate = (models) => {
    ParticipationEvent.belongsTo(models.Child, { foreignKey: "child_id" });
    ParticipationEvent.belongsTo(models.Event, { foreignKey: "event_id" });
  };

  return ParticipationEvent;
}
