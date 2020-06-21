var resources = {
    logo:{
        data:"data:image/png;base64,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",
    },
    rupee_symbol:{
        width:8,
        data:"data:image/png;base64,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",
    }
}