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
      timestamps: true,
    }
  );
  //associations

  ParticipationEvent.associate = (models) => {
    //un enregistrement par enfant

    ParticipationEvent.belongsTo(models.Child, { foreignKey: "child_id" ,as: "child",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
     });
     //un enregistrement pour un evenement
     
     ParticipationEvent.belongsTo(models.Event, { foreignKey: "event_id",
        as:"event",
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
      });
  };

  return ParticipationEvent;
}
