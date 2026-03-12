import db from "../models/index.js";
const Child=db.Child;

//creer un enfant

export const createChild =async(req,res) => {
    try {
        const {nom,classe_id,parent_id}=req.body;
        const child =await Child.create({nom,classe_id,parent_id});
        res.status(201).json(child);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
;
    };
    //recuperer tous les enfants
    export const getAllChildren = async(req,res) => {
        try{

            const children =await Child.findAll();
            res.json(children);
        } catch (err) {
            res.status(500).json({message:err.message});
        }
        };

    //Recuperer un enfant  par id

    export const getChildById =async(req,res) =>{
        try{
            const child =await Child.findByPk(req.params.id);
            if (!child) 
                return res.status(404).json({message:"Enfant introuvable"});
            res.json(child);
}catch(err) {
    res.status(500).json({message:err.message});
} 
};

//mise à jour d'un enfant

export const updateChild =async(req,res)=>{
    try {
        const {nom,clase_id,parent_id} =req.body;
        const child =await Child.findByPk(req,params.id);
        if (!child)
            return res.status(404).json({message:"Enfant intouvable"});

        await child.update({nom ,classe_id,parent_id});
        res.json(child);
}catch(err){
    res.status(500).json({message:err.message})
}
    
};

//delete un enfant
export const deleteChild=async(req,res)=>{
    try {
        const child =await Child.findByPk(req.params.id);
        if(!child)
            return res.status(404).json({message:"Enfant introuvable"});

        await child.destroy();
        res.json({message:"Enfant supprimé"});
}catch(err){
    res.status(500).json({message:err.message});
}
    
};
//recuperer les repas d'unenfant
export const getMealsByChild = async (req, res) => {
  try {
    const { id } = req.params;

    const meals = await db.ReservationMeal.findAll({
      where: { child_id: id },
      include: [
        {
          model: db.Meal,
          foreignKey: "meal_id"
        }
      ]
    });
    

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// recuperer les devoirs d'un enfant


export const getHomeworkByChild = async (req, res) => {
  try {
    const { id } = req.params;

    const child = await db.Child.findByPk(id);

    if (!child) {
      return res.status(404).json({ message: "Enfant introuvable" });
    }

    const homework = await db.Homework.findAll({
      where: { classe_id: child.classe_id }
    });

    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//recuperer les evenements d'un enfant

export const getEventsByChild = async (req, res) => {
  try {
    const { id } = req.params;

    const events = await db.ParticipationEvent.findAll({
      where: { child_id: id },
      include: [
        {
          model: db.Event,
          foreignKey: "event_id"
        }
      ]
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







