import { test, expect } from '@playwright/test';
import flujo_compra from '../pageObject/flujo_compra'

test.describe('Como automatizador quiero realizar pruebas a la pagina web', () => {
    const lista_flores = ['MDF 0001', 'MDF 00010'];
    const lista_flores_cumpleaños =['MDF 0001']
    
    test.beforeEach(async ({ page }) => {
        let compra = new flujo_compra(page)

        await compra.abrirWeb();
    })

    test('Seleccionar dos productos de la categoría amor para agregarlos al carro de compras', async ({ page }) => {
        let compra = new flujo_compra(page)
        await page.setDefaultTimeout(60000);

        for(const flor of lista_flores){
            await test.step('selecciona la categoria en donde voy a comprar', async () => {
                await compra.seleccionaCategoriaCompra('Amor');
            })
    
            await test.step(`añadir al carrito el  ramo de flores: ${flor}`, async () => {
                await compra.añadirProducto(flor);
            })    
        }        

        await test.step('expero visualiza los productos en el carrito de compras', async () => {
           await compra.validacionCarrito();
        })
    })

    test('Seleccionar un producto de la categoría cumpleaños, agregarlo y eliminarlo del carro de compras', async ({ page }) => {
        let compra = new flujo_compra(page)
        await page.setDefaultTimeout(60000);

        for(const flor of lista_flores_cumpleaños){
            await test.step('selecciona la categoria en donde voy a comprar', async () => {
                await compra.seleccionaCategoriaCompra('Amor');
            })
    
            await test.step(`añadir al carrito el  ramo de flores: ${flor}`, async () => {
                await compra.añadirProducto(flor);
            })    
        }        

        await test.step('elimar un producto', async () => {
            await compra.eliminarProducto();
        })
        
        await test.step('expero visualiza los productos  de la canasta en  0', async () => {
          await compra.validacionCarritoPriceCero();
        })
    })

})
