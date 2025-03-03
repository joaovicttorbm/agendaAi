import { Event } from "@mui/icons-material";
import { Box, Button, Link, TextField, Typography, Grid2 } from "@mui/material";
import React from "react";

interface AuthField {
  label: string;
  name: string;
  type?: string;
  error?: string;
}

interface AuthFormProps {
  title: string;
  fields: AuthField[];
  buttonText: string;
  onSubmit: () => void;
  onChange: (name: string, value: string) => void;
  linkText: string;
  linkHref: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonText,
  onSubmit,
  onChange,
  linkText,
  linkHref,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Box
      sx={{ maxWidth: 400, margin: "0 auto", padding: 2, marginTop: "5rem" }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Event sx={{ fontSize: 50 }} /> {/* Ícone de Agenda */}
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          {fields.map((field) => (
            <Grid2 sx={{ width: "100%" }} margin={"auto"} key={field.name}>
              <TextField
                label={field.label}
                type={field.type || "text"}
                name={field.name}
                error={!!field.error}
                helperText={field.error}
                onChange={(e) => onChange(field.name, e.target.value)}
                fullWidth
                margin="normal"
                slotProps={{
                  input: {
                    "aria-label": field.label,
                    autoComplete:
                      field.name === "password" ? "current-password" : "email",
                  },
                }}
              />
            </Grid2>
          ))}
        </Grid2>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {buttonText}
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Link href={linkHref}>{linkText}</Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
