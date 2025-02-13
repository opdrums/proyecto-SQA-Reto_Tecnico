import { test, expect } from '@playwright/test';

class flujo_compra{
    constructor(page){
        this.page = page; 
    }

    async abrirWeb(){
        await this.page.goto("https://www.floristeriamundoflor.com/");
        await this.page.getByRole('link', { name: 'Floristería Mundo Flor' }).waitFor({state:"visible"});
    }

    async seleccionaCategoriaCompra(categoria){
        await this.page.locator('#primary-menu').getByRole('link', { name: categoria }).click();
    }

    async añadirProducto(flor){
        await this.page.getByRole('heading', { name: 'Amor' }).waitFor({state:'visible', timeout:50000})
        await this.page.getByTitle(flor).first().hover()
        await this.page.getByTitle(flor).first().click()
        await this.page.getByRole('button', {name: 'Añadir al carrito'}).click()
    }

    async validacionCarrito(){
        await this.page.waitForTimeout(2000); 
        let carrito = await this.page.locator('//div[2]/form/div/table/tbody')
        await expect(carrito).toBeVisible()
    }

    async eliminarProducto(){
        await this.page.getByRole('link', { name: 'Remove this item' }).click()
    }

    async validacionCarritoPriceCero(){
        await this.page.waitForTimeout(2500); 
        let priceText = await this.page.getByRole('button', { name: /CARRO/i }).textContent();
        let priceValue = parseFloat(priceText?.replace(/[^\d]/g, '') || '0');
        await expect(priceValue).toBe(0);
    }
}

export default flujo_compra; 