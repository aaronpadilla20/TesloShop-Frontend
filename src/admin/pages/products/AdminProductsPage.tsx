import { Link, useLocation } from "react-router";
import { PencilIcon, PlusIcon } from "lucide-react";

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../../../components/ui/table";
import { AdminTitle } from "../../components/AdminTitle";
import { CustomPagination } from "../../../components/custom/CustomPagination";
import { Button } from "../../../components/ui/button";
import { useProducts } from "../../../shop/hooks/useProducts";
import { CustomFullScreenLoading } from "../../../components/custom/CustomFullScreenLoading";
import { currencyFormatter } from "../../../lib/currency-formatter";

export const AdminProductsPage = () => {
    const { pathname } = useLocation();
    const { data, isLoading } = useProducts();

    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Prouctos" subTitle="Aqui puedes ver y administrar tus productos" />
                <div className="flex justify-end mb-10 gap-4">
                    <Link to={`${pathname}/new`}>
                        <Button>
                            <PlusIcon />
                            Nuevo Producto
                        </Button>
                    </Link>
                </div>
            </div>


            <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25 text-center font-bold">Imagen</TableHead>
                        <TableHead className="w-25 text-center font-bold">Nombre</TableHead>
                        <TableHead className="text-center font-bold">Precio</TableHead>
                        <TableHead className="text-center font-bold">Categoria</TableHead>
                        <TableHead className="text-center font-bold">Inventario</TableHead>
                        <TableHead className="text-center font-bold">Tallas</TableHead>
                        <TableHead className="text-center font-bold">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link
                                        to={`${pathname}/${product.id}`}
                                        className="hover:text-blue-500 underline"
                                    >
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-center">{currencyFormatter(product.price)}</TableCell>
                                <TableCell className="text-center">{product.gender} </TableCell>
                                <TableCell className="text-center">{product.stock} Stock</TableCell>
                                <TableCell className="text-center">{product.sizes.join(', ')}</TableCell>
                                <TableCell className="text-center">
                                    <Link to={`${pathname}/${product.id}`}>
                                        <PencilIcon
                                            className="w-4 h-4 text-blue-500"
                                        />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }


                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages || 0} />
        </>
    );
};
