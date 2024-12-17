import { ActionFunction, type MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Col, Input, Row } from "antd";
import { z } from "zod";
import { productSchema } from "~/validations/productSubmitValidation";

// Type for actionData
interface ActionData {
    errors?: {
        name?: { _errors: string[] };
        description?: { _errors: string[] };
        price?: { _errors: string[] };
    };
    message?: string;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const action: ActionFunction = async ({ request }) => {
    const formdata = await request.formData();
    const name = formdata.get("name") as string;
    const description = formdata.get("description") as string;
    const price = formdata.get("price") as string;

    try {
        const validatedData = productSchema.parse({ name, description, price });
        const response = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });
        if (!response.ok) {
            throw new Error("Failed to post data");
        }
        return { message: "Data successfully submitted!" };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors = error.format();
            return { errors: validationErrors };
        }
        throw error;
    }
};

export default function ProductControl() {
    const actionData = useActionData<ActionData>();

    return (
        <>
            <div className="flex justify-center items-center p-32">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <h1 className="text-lg font-extrabold">Add Products master</h1>
                    </Col>
                    <div className="p-24 rounded-lg shadow-2xl bg-blue-50">
                        <Form method="post">
                            <Row gutter={[16, 16]}>
                                {/* Name Input */}
                                <Col span={12}>
                                    <Input type="text" name="name" placeholder="Name" />
                                    {actionData?.errors?.name && (
                                        <p className="text-red-500 text-xs">
                                            {actionData.errors.name._errors[0]}
                                        </p>
                                    )}
                                </Col>

                                {/* Description Input */}
                                <Col span={12}>
                                    <Input type="text" name="description" placeholder="Description" />
                                    {actionData?.errors?.description && (
                                        <p className="text-red-500 text-xs">
                                            {actionData.errors.description._errors[0]}
                                        </p>
                                    )}
                                </Col>

                                {/* Price Input */}
                                <Col span={24}>
                                    <Input type="text" name="price" placeholder="Price" />
                                    {actionData?.errors?.price && (
                                        <p className="text-red-500 text-xs">
                                            {actionData.errors.price._errors[0]}
                                        </p>
                                    )}
                                </Col>

                                {/* Submit Button */}
                                <Col span={24}>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Submit
                                    </button>
                                </Col>
                            </Row>

                            {/* Success Message */}
                            {actionData?.message && (
                                <p className="text-green-500 text-sm mt-4">{actionData.message}</p>
                            )}
                        </Form>
                    </div>
                </Row>
            </div>
        </>
    );
}
