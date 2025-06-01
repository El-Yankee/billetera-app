import { StyleSheet } from "react-native";

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      color: theme.text,
    },
    section: {
      marginBottom: 32,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
    input: {
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 6,
      padding: 8,
      fontSize: 16,
      backgroundColor: theme.inputBg,
      marginBottom: 8,
      minWidth: 80,
      color: theme.text,
    },
  });
