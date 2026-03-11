import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { useSearchParams } from "react-router";
import { useLayoutEffect } from "react";

export const FilterSidebar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sizes = [
        { id: "xs", label: "XS" },
        { id: "s", label: "S" },
        { id: "m", label: "M" },
        { id: "l", label: "L" },
        { id: "xl", label: "XL" },
        { id: "xxl", label: "XXL" },
    ];
    const prices = ['any', '0-50', '50-100', '100-200', '200+'];

    const validSizeIds = sizes.map(s => s.id);

    const getCleanFilters = (params: URLSearchParams) => {
        const price = prices.includes(params.get('price') || '')
            ? params.get('price')!
            : 'any';

        // Crea un array unicamente con las tallas validas tomando en consideracion el map de Ids
        const sizes = (params.get('sizes') ?? '')
            .split(',')
            .filter(s => validSizeIds.includes(s));

        return { price, sizes };
    };

    // Partial equivale a crear una interfaz y marcar los valores como opciones es una opcion 
    // mas corta utilizar Partial
    const setFilters = (newValues: Partial<{ price: string, sizes: string[] }>) => {
        const params = new URLSearchParams(searchParams); // Creas una copia de URL actual siempre es mas seguro hacer esto que directamente mutar el objeto de searchParams

        // Actualizamos el query Param de precio
        if (newValues.price !== undefined) {
            params.set('price', newValues.price);
        }

        // Actualizamos el query param de sizes
        if (newValues.sizes !== undefined) {
            if (newValues.sizes.length > 0) {
                params.set('sizes', newValues.sizes.join(','));
            } else {
                params.delete('sizes');
            }
        }

        // Siempre reinicia page si cambian filtros
        if (newValues.sizes !== undefined || newValues.price !== undefined) {
            params.set('page', '1');
        }

        setSearchParams(params);
    };

    const handleSizeChanged = (size: string) => {
        // Obtenemos los valores limpios de la URL actual
        const { price: currentPriceClean, sizes: currentSizesClean } = getCleanFilters(searchParams);

        // Calculamos los nuevos sizes según la interacción del usuario
        const newSizes = currentSizesClean.includes(size)
            ? currentSizesClean.filter(s => s !== size)
            : [...currentSizesClean, size];

        // Actualizamos la URL usando setFilters
        setFilters({
            price: currentPriceClean, // aseguramos que price sea válido
            sizes: newSizes
        });
    };

    const handlePriceChanged = (price: string) => {
        // Siempre obtenemos los filtros limpios de la URL actual
        const { sizes: currentSizesClean } = getCleanFilters(searchParams);

        // Actualizamos la URL usando setFilters con price nuevo y sizes limpios
        setFilters({
            price,
            sizes: currentSizesClean
        });
    };
    useLayoutEffect(() => {
        const { price, sizes } = getCleanFilters(new URLSearchParams(window.location.search));
        setFilters({ price, sizes });
    }, []);

    const { price: currentPrice, sizes: currentSizes } = getCleanFilters(searchParams);

    return (
        <div className="w-64 space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-4">Filtros</h3>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
                <h4 className="font-medium">Tallas</h4>
                <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size.id}
                            variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
                            size="sm"
                            className="h-8"
                            onClick={() => handleSizeChanged(size.id)}
                        >
                            {size.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-4">
                <h4 className="font-medium">Precio</h4>
                <RadioGroup value={currentPrice} className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="any"
                            id="priceAny"
                            onClick={() => handlePriceChanged('any')}
                        />
                        <Label htmlFor="priceAny" className="text-sm cursor-pointer">Cualquier precio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="0-50"
                            id="price1"
                            onClick={() => handlePriceChanged('0-50')}
                        />
                        <Label htmlFor="price1" className="text-sm cursor-pointer">$0 - $50</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="50-100"
                            id="price2"
                            onClick={() => handlePriceChanged('50-100')}
                        />
                        <Label htmlFor="price2" className="text-sm cursor-pointer">$50 - $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="100-200"
                            id="price3"
                            onClick={() => handlePriceChanged('100-200')}
                        />
                        <Label htmlFor="price3" className="text-sm cursor-pointer">$100 - $200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="200+"
                            id="price4"
                            onClick={() => handlePriceChanged('200+')}
                        />
                        <Label htmlFor="price4" className="text-sm cursor-pointer">$200+</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};