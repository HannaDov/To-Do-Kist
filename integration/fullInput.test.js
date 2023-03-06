describe('FullInput', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await
            page.goto('http://localhost:6006/iframe.html?args=&id=example-fullinput--template&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
//'http://localhost:9009/iframe.html?id=additemform-component--add-item-form-base-example