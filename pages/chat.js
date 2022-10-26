import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2ZWhwcGFieHFnY2p0cHd1d2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3MTcxNjQsImV4cCI6MTk4MjI5MzE2NH0.cSMHBYOXU1mdk02wlJA3egM8XYHUlGp1tvLuHqL3lV4";
const PROJECT_URL = "https://bvehppabxqgcjtpwuwan.supabase.co";
const supabaseClient = createClient(PROJECT_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new)
    })
    .subscribe();
}

export default function ChatPage() {
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const router = useRouter();

  const { user } = router.query;

  // ============busca dos dados do supabase=============
  useEffect(() => {
    const dadosDoSupabase = supabaseClient
      .from("mensagens") // Esolhemos a lista, selecionamos tudo, ordenamos e setamos a lista, isso toda vez que página for renderizada
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);

      });

        escutaMensagensEmTempoReal((novaMensagem) => {
          setListaDeMensagens((valorAtualDaLista) => {
            return [
              novaMensagem, ...valorAtualDaLista
            ]
          })
      });
  }, []);

  // ============Função adicionar mensagem na lista==========
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: user,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        console.log(data)
  })}

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              value={mensagem}
              onChange={(e) => {
                const valor = e.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // evitando pular de linha
                  handleNovaMensagem(mensagem);
                }
              }}
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              styleSheet={{
                marginTop: "-9px",
                padding: "10px",
                height: "52px",
              }}
              variant="primary"
              colorVariant="light"
              label="Enviar"
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log('Salva esse sticker')
                handleNovaMensagem(':sticker:' + sticker)
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => (
        <Text
          key={mensagem.id}
          tag="li"
          styleSheet={{
            borderRadius: "5px",
            padding: "6px",
            marginBottom: "12px",
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              marginBottom: "8px",
            }}
          >
            <Image
              styleSheet={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
                marginBottom: "4px",
              }}
              src={`https://github.com/${mensagem.de}.png`}
              alt=""
            />
            <Text tag="strong">{mensagem.de}</Text>
            <Text
              styleSheet={{
                fontSize: "12px",
                marginTop: "2px",
                marginLeft: "2px",
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
            </Text>
          </Box>
          {mensagem.texto.startsWith(":sticker:")
            ? <Image src={mensagem.texto.replace(':sticker:', '')} alt='' />
            : mensagem.texto}
        </Text>
      ))}
    </Box>
  );
}
