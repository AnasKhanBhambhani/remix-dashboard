import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
type Products = {
    id: number;
    name: string;
    description: string;
    price: string;
};
export const meta: MetaFunction = () => {
    return [
        { title: "Products" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const loader = async () => {
    const data = await fetch('http://localhost:3000/products');
    const response: Products[] = await data.json();
    return json(response);
};
export default function Products() {
    const data = useLoaderData<Products[]>();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            
            {data?.map((item) => (
                <>
                    <div className="w-60 bg-gradient-to-l from-slate-300 to-slate-100 text-slate-600 border border-slate-300 grid grid-col-2 justify-center p-6 gap-4 rounded-lg shadow-md">
                        <div className="col-span-2 text-lg font-bold capitalize rounded-md">
                            Name: {item.name}
                        </div>
                        <div className="col-span-2 rounded-md">
                            Description: {item.description}
                        </div>
                        <div className="col-span-2 rounded-md">
                            Price: {item.price}
                        </div>
                    </div></>
            ))}
        </div>
    );
}


