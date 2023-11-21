const { selectUniqueData, registerData, deleteData } = require("../database/queryDB")
const {cryptographyPassword, comparePassword} = require("../core/cryptography")
const {generateToken} = require("../core/jwt")

const registerUser = async(req, res) => {
  const { name, lastname, email, password } = req.body
 try {
  const checoutEmail = await selectUniqueData("users", {email})
  
  if (checoutEmail) {
   return res.status(404).json({mensagem: 'Esse email ja foi cadastrado.'})
  }
  const encryptedPassword = await cryptographyPassword(password)
  
  const user = {name, lastname, email, password: encryptedPassword}

  const registeredUser = await registerData("users", user)
  delete registeredUser.password
  
  return res.status(201).json(registeredUser)

 } catch (error) {
  return  res.status(500).json({ mensagem: "Erro interno do servidor." })
 }
}

const loginUser = async(req, res) => {
  const {email, password} = req.body
  
  try {
    const user = await selectUniqueData("users", {email})

    if (!user) {
     return res.status(404).json({mensagem: 'Email ou senha invalidos.'})
    }
    
    const chechoutPassword = await comparePassword(password, user.password) 
    
    if (!chechoutPassword) {
      return res.status(404).json({mensagem: 'Email ou senha invalidos.'})
    }
    
    delete user.password
    
    const token = generateToken({id: user.id}, "1h")
    
    return res.status(200).json({user, token})
    
  } catch (error) {
    return  res.status(500).json({ mensagem: "Erro interno do servidor." })
  }

}

const detailUser = async (req, res) => {
  const {id} = req.user
  try {
    const user = await selectUniqueData("users", {id})

    if (!user) {
      return res.status(404).json({mensagem: "Usuario não encontrado."})
    }

    delete user.password

    return res.status(200).json(user)
  } catch (error) {
    return  res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}


const updateUser = async (req, res) => {
  const {id} = req.user
  const { name, lastname, email, password } = req.body
  try {
    const user = await selectUniqueData("users", {id})

    if (!user) {
      return res.status(404).json({mensagem: "Usuario não encontrado."})
    }

    const chechoutEmail = await selectUniqueData("users", {email})
    
    if (chechoutEmail && chechoutEmail.id !== id) {
    return res.status(404).json({mensagem: 'Esse email ja foi cadastrado.'})
    }
    const encryptedPassword = await cryptographyPassword(password)
    
    const updatedUser = {name, lastname, email, password: encryptedPassword}
    
    await atualizarDados("users", {id}, updatedUser)
    
    return res.status(204).json(updatedUser)
  } catch (error) {
    return  res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}


const deleteUser = async (req, res) => {
  const {id} = req.user
  try {
    const deletedUser = await selectUniqueData("users", {id})

    if (!deletedUser) {
      return res.status(404).json({mensagem: "Produtor não encontrado."})
    }

    await deleteData("users", {id})
    
    return res.status(200).json({mensagem: `O cadastro do usuario ${deletedUser.name} ${deletedUser.lastname} foi excluido.`})
  } catch (error) {
    return  res.status(500).json({ mensagem: "Erro interno do servidor." })
  }
}

module.exports = {
  registerUser,
  loginUser, 
  detailUser,
  updateUser,
  deleteUser
}
