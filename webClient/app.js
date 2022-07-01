const { WebClient } = require('./webClient');
(
    async () => {
        const a = new WebClient({"baseURL": "https://zmiy5zvytl.execute-api.ap-east-1.amazonaws.com"})

        const res = await a.post({
            path: "/stage/ro-stg-export-report", body: {
                type: 'realtime',
                name: 'ggr',
                value: {}
            }
        });

        console.log(res);
    }
)();