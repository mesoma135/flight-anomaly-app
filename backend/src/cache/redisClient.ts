import { createClient } from 'redis';

export const client = createClient({
    username: String(process.env.REDIS_USERNAME) || "",
    password: String(process.env.REDIS_PASSWORD) || "",
    socket: {
        host: String(process.env.REDIS_HOST) || "",
        port: Number(process.env.REDIS_PORT) || 15717
    }
});

export const connectRedis = async() =>{
    try{
        await client.connect();
        await client.set('foo', 'bar');
        const result = await client.get('foo');
        console.log(result); // >>> bar
        }
        catch(error){
            console.error("Redis Client Error", error);
        }
    };
