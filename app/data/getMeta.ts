async function getMeta() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    const hoursRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/hours?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["hours_"]
            }
        })
    const footerRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/footer?locale=undefined&draft=false&depth=1`, {
        next: {
            tags: ["footer_"]
        }
    });
    const navRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/navigation?locale=undefined&draft=false&depth=1`, {
        next: {
            tags: ["navigation_"]
        }
    });
    const siteOptions = await res.json();
    const hours = await hoursRes.json();
    const footer = await footerRes.json();
    const nav = await navRes.json();

    return {
        siteOptions: siteOptions,
        hours: hours,
        footer: footer,
        nav: nav
    };
}

export default getMeta;
