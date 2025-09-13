import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import api from "../lib/api";
import { style } from "../styles/main";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const registrar = async () => {
    try {
      if (!nome || !email || !senha) {
        Alert.alert("Campos obrigatórios", "Preencha nome, e-mail e senha.");
        return;
      }
      await api.post("/usuarios/registrar", { nome, email, senha });
      Alert.alert("Sucesso", "Usuário cadastrado!");
      router.replace("/");
    } catch (err: any) {
      const msg = err?.response?.data?.mensagem || "Tente novamente.";
      Alert.alert("Erro ao cadastrar", msg);
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={style.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={style.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={style.input}
      />
      <Button title="Registrar" onPress={registrar} />
    </View>
  );
}
