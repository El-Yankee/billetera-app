import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.background,
    },

    section: {
      marginBottom: 32,
    },

    cardBlue: {
      backgroundColor: theme.cardBlue,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    cardPink: {
      backgroundColor: theme.cardPink,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    cardText: {
      fontSize: 18,
      color: theme.text,
    },
    cardTextBlue: {
      fontSize: 18,
      color: theme.textBlue,
    },
    cardTextPink: {
      fontSize: 18,
      color: theme.textPink,
    },
    subtitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme.subtitle,
    },
    buttonLink: {
      backgroundColor: theme.buttonBg,
      color: theme.buttonText,
      padding: 12,
      borderRadius: 8,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 24,
      fontSize: 18,
    },

    label: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 6,
      marginTop: 10,
      fontWeight: "500",
    },
    input: {
      borderWidth: 0,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.inputBg,
      marginBottom: 12,
      color: theme.text,
      elevation: 1,
      minHeight: 44,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 2,
    },
    button: {
      backgroundColor: theme.buttonBg,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 12,
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: "bold",
      fontSize: 18,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 18,
      color: theme.text,
    },
  });
