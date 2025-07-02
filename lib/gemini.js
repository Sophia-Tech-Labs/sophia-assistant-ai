const { GoogleGenAi } = require("@google/genai");
const  { getChatHistory,storeChatMessages } = require("../history");
const ai = new GoogleGenAi({})

async function geminiAiReply(req,res){
try{
	let apikey = req.headers["Authorization"];
	const { chatID, message,system } = req.body;
	apikey = apikey.split(" ")[1];
	if(!apikey && !chatID && !message){
		res.status(400).json({
			status:400,
			message:"All fields Are Required"
		})
		return;
	}
	const checkUser = await db.query("SELECT * FROM users WHERE apikey = $1",[apikey]);
	if(checkUser.length === 0){
		return res.status(403).json({
			status:403,
			message:"Invalid ApiKey Access Denied"
		})
	}
	const history = await getChatHistory(apikey,chatID);
	const chat = ai.chats.create({
		model: "gemini-2.5-flash",
		config:{
			systemInstruction:system,
			thinkingConfig:{
				thinkingBudget:0
			},
		},
		history
	})
	const response = await chat.sendMessage({
		message
	});
	if(response.text){
		await storeChatMessages(apikey,chatID,"user",message);
		await storeChatMessages(apikey,chatID,"model",response.text);
		res.status(200)json({
			status:200,
			response
		})
	}
 } catch(err){
 	console.error("Error While generating response: ",err)
 }
}
