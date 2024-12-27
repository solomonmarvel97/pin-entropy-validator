class PINEntropyValidator {
    // Common patterns to reject
    static PATTERNS = {
        SEQUENTIAL: /^(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)$/,
        REPEATED: /^(\d)\1{3,}$/,  // Same digit repeated 4+ times
        PALINDROME: /^(\d)(\d)\2\1$/,  // e.g., 1221, 6996
        SIMPLE_ASCENDING: /^0123|1234|2345|3456|4567|5678|6789$/,
        SIMPLE_DESCENDING: /^9876|8765|7654|6543|5432|4321|3210$/,
        YEAR_PATTERN: /^(?:19|20)\d{2}$/,  // Common year patterns
    };

    static validatePIN(pin) {
        // Convert pin to string for consistent handling
        pin = pin.toString();

        // Basic validation
        if (!/^\d{4}$/.test(pin)) {
            return {
                isValid: false,
                reason: "PIN must be exactly 4 digits"
            };
        }

        // Check for patterns
        if (this.PATTERNS.SEQUENTIAL.test(pin)) {
            return {
                isValid: false,
                reason: "Sequential patterns are not allowed"
            };
        }

        if (this.PATTERNS.REPEATED.test(pin)) {
            return {
                isValid: false,
                reason: "Repeated digits are not allowed"
            };
        }

        if (this.PATTERNS.PALINDROME.test(pin)) {
            return {
                isValid: false,
                reason: "Palindrome patterns are not allowed"
            };
        }

        if (this.PATTERNS.YEAR_PATTERN.test(pin)) {
            return {
                isValid: false,
                reason: "Year patterns are not allowed"
            };
        }

        // Additional checks for common sequences
        const uniqueDigits = new Set(pin.split('')).size;
        if (uniqueDigits < 3) {
            return {
                isValid: false,
                reason: "PIN must contain at least 3 different digits"
            };
        }

        // Check for mathematical patterns
        const digits = pin.split('').map(Number);
        const differences = new Set();
        for (let i = 1; i < digits.length; i++) {
            differences.add(digits[i] - digits[i-1]);
        }
        if (differences.size === 1) {
            return {
                isValid: false,
                reason: "Arithmetic sequences are not allowed"
            };
        }

        return {
            isValid: true,
            reason: "PIN meets security requirements"
        };
    }

    static calculateStrength(pin) {
        let score = 0;
    
        // Add points for length
        score += pin.length;
    
        // Add points for unique digits
        score += new Set(pin.split('')).size;
    
        // Subtract points for matching patterns
        if (this.PATTERNS.SEQUENTIAL.test(pin)) score -= 2;
        if (this.PATTERNS.REPEATED.test(pin)) score -= 2;
    
        return score >= 5 ? "Strong" : score >= 3 ? "Medium" : "Weak";
    }
    

}

// Example usage:
const testPINs = ['1234', '0000', '1111', '9999', '2580', '1379', '2024', '1221', '9876', '2468'];

testPINs.forEach(pin => {
    const result = PINEntropyValidator.validatePIN(pin);
    const strengthResult = PINEntropyValidator.calculateStrength(pin);
    console.log(`PIN ${pin}: ${result.isValid ? 'Valid' : 'Invalid'} - ${result.reason} - Strength: ${strengthResult}`);
});
