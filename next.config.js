export async function headers() {
    return [
        {
            // Permitir CORS para todas as rotas
            source: "/:path*",
            headers: [
                {
                    key: "Access-Control-Allow-Credentials",
                    value: "true",
                },
                {
                    key: "Access-Control-Allow-Origin",
                    value: "*", // Permitir todas as origens, altere conforme necessário
                },
                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                },
                {
                    key: "Access-Control-Allow-Headers",
                    value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                },
            ],
        },
    ];
}