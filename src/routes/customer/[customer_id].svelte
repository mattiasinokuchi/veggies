<!--    This is a specific customers page   -->
<script context="module">
    export async function load({ fetch, page }) {
        const { customer_id } = page.params;
        let res = null;
        try {
            res = await fetch(`/customer/${customer_id}.json`);
            const customer = await res.json();
            res = await fetch(`/customer/get_order/${customer_id}.json`);
            const order = await res.json();
            res = await fetch(`/customer/get_product_options.json`);
            const option = await res.json();
            res = await fetch(`/customer/get_time_out/${customer_id}.json`);
            const time_out = await res.json();
            return {
                props: {
                    customer,
                    order,
                    option,
                    time_out,
                },
            };
        } catch (error) {
            return error;
        }
    }
</script>

<script>
    export let customer, order, option, time_out;
    let selected_product_id, selected_product, start_date;
    let showDelete = false;
    $: if (selected_product_id) {
        selected_product = option.find((el) => el.id === selected_product_id);
    }
</script>

<main>
    <h1>{customer.first_name} {customer.last_name}</h1>
    
    <!-- This is a list of subscription time-outs with delete buttons -->
    <section class="box">
        <h2>Subscription time-out</h2>
        {#if time_out.length > 0}
            <ul>
                {#each time_out as { time_out_id, start_date, end_date }}
                    <li>
                        <form
                            action="/customer/remove_time_out/{time_out_id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            {start_date} to {end_date}
                            <button type="submit" disabled={!customer.active}
                                >Delete</button
                            >
                        </form>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>

    <!-- This is a form for subscription time-out -->
    <form action="/customer/add_time_out.json" method="post" class="whitebox">
        <h2>Add time-out</h2>
        <input type="hidden" name="customer_id" value={customer.customer_id} />
        <label class="time-out-label" for="start_date">Start date</label>
        <input required type="date" name="start_date" bind:value={start_date} />
        <label class="time-out-label" for="end_date">End date</label>
        <input required type="date" name="end_date" min={start_date} />
        <br />
        <button type="submit">Add</button>
    </form>

    <!-- This is a list of subscriptions/orders with delete buttons -->
    <section class="box">
        <h2>Subscriptions/orders</h2>
        {#if order.length > 0}
            <ul>
                {#each order as { product_name, order_id, start_date }}
                    <li>
                        <form
                            action="/customer/remove_order/{order_id}.json?_method=delete"
                            method="post"
                            disabled={!customer.active}
                        >
                            {product_name}, (start/delivery {start_date})
                            <br>
                            <button type="submit" disabled={!customer.active}
                                >Delete</button
                            >
                        </form>
                    </li>
                {/each}
            </ul>
        {/if}
    </section>

    <!-- This is a form for adding products -->
    <form action="/customer/add_product.json" method="post" class="whitebox">
        <h2>Add order:</h2>
        <input
            hidden
            type="text"
            value={customer.customer_id}
            name="customer_id"
        />
        <label for="product_id">Product</label>
        <select bind:value={selected_product_id} name="product_id">
            <option value="">- Please choose an option -</option>
            {#each option as { product_name, product_id }}
                <option value={product_id}>{product_name}</option>
            {/each}
        </select>
        {#if selected_product && selected_product_id !== ""}
            {#if selected_product.delivery_interval}
                <label for="start_date">Start</label>
            {:else}
                <!-- start_date is used as delivery date for one-time orders -->
                <label for="start_date">Delivery</label>
            {/if}
            <input required type="date" name="start_date" />
            <button type="submit">Add product</button>
        {/if}
    </form>

    <!-- This is a form for contact information -->
    <form action="/customer/update_contact_info.json" method="post" class="box">
        <h2>Contact Information</h2>
        <input type="hidden" name="customer_id" value={customer.customer_id} />
        <p>
            <label for="first_name">First Name</label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                value={customer.first_name}
            />
        </p>
        <p>
            <label for="last_name">Last Name</label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                value={customer.last_name}
            />
        </p>
        <p>
            <label for="street_address">Street Address</label>
            <input
                type="text"
                id="street_address"
                name="street_address"
                value={customer.street_address}
            />
        </p>
        <p>
            <label for="postcode">Postcode</label>
            <input
                type="text"
                id="postcode"
                name="postcode"
                value={customer.postcode}
            />
        </p>
        <p>
            <label for="city">City</label>
            <input type="text" id="city" name="city" value={customer.city} />
        </p>
        <p>
            <label for="telephone">Telephone</label>
            <input
                type="tel"
                id="telephone"
                name="telephone"
                value={customer.telephone}
            />
        </p>
        <p>
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={customer.email}
            />
        </p>
        <input type="submit" value="Update" />
    </form>

    <section class="whitebox">
        <!-- This is a form for deleting customers -->
        <button on:click={() => (showDelete = true)} hidden={showDelete}
            >Delete Customer</button
        >
        {#if showDelete}
            <form
                action="/customer/{customer.customer_id}.json?_method=delete"
                method="post"
            >
                <label for="button"
                    >Delete customer with any unbilled deliveries?</label
                >
                <input
                    hidden
                    value={customer.delivery_order}
                    name="delivery_order"
                />
                <input
                    id="button"
                    type="submit"
                    value="I know what I'm doing"
                />
                <button on:click={() => (showDelete = false)}>Cancel</button>
            </form>
        {/if}
    </section>
</main>

<style>
    h1 {
        width: 100%;
    }
    .time-out-label {
        width: auto;
    }
</style>
