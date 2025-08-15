export function validatePassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new Error("Senhas não coincidem");
  }

  if (password.length < 8) {
    throw new Error("Senha deve ter pelo menos 8 caracteres");
  }

  if (!/[A-Z]/.test(password)) {
    throw new Error("A senha deve conter pelo menos uma letra maiúscula");
  }

  if (!/[a-z]/.test(password)) {
    throw new Error("A senha deve conter pelo menos uma letra minúscula");
  }

  if (!/[0-9]/.test(password)) {
    throw new Error("A senha deve conter pelo menos um número");
  }

  if (!/[!@#$%^&*()_+]/.test(password)) {
    throw new Error("A senha deve conter pelo menos um caractere especial");
  }
}

export function validatePasswordRules(password) {
    if (!password) {
      return {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
      };
    }
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+]/.test(password),
    };
  }