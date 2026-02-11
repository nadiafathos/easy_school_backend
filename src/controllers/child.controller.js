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

