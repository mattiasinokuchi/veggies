import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('customers_subscriptions')
        .select('customer (delivery_order, first_name, last_name), subscription (name)');
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.customer.delivery_order - b.customer.delivery_order;
    });
    return {
        body: inDeliveryOrder
    };
};

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customers_subscriptions')
        .upsert({
            customer: request.body.get('customer'),
            subscription: request.body.get('subscription'),
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    }
    return {
        body: data
    };
};