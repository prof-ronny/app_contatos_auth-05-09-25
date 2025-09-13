import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import api, { setAuthToken } from "../lib/api";
import { style } from "../styles/main";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const entrar = async () => {
    try {
      if (!email || !senha) {
        Alert.alert("Campos obrigatórios", "Preencha e-mail e senha.");
        return;
      }
      const { data } = await api.post("/usuarios/login", { email, senha });
      if (!data?.token) throw new Error("Token não retornado");
      await setAuthToken(data.token);
      router.push("/contatos");
    } catch (err: any) {
      const msg =
        err?.response?.data?.mensagem || err?.message || "Falha ao autenticar.";
      Alert.alert("Erro ao entrar", msg);
    }
  };

  return (
    <View style={style.container}>
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
      <Button title="Entrar" onPress={entrar} />
      <Button title="Cadastrar" onPress={() => router.push("/cadastro")} />
    </View>
  );
}
