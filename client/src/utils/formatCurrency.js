export function formatRupiah(amount) {
    if (typeof amount !== 'number') {
        amount = Number(amount);
        if (isNaN(amount)) return 'RP.0,00';
    }
    return 'RP.' + amount.toFixed(2)
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
