<!--	This is the parent page for products	-->
<script context="module">
	export async function load({ fetch }) {
		const res = await fetch("/product.json");
		if (res.ok) {
			const product = await res.json();
			return {
				props: { product },
			};
		}
		const { message } = await res.json();
		return {
			error: new Error(message),
		};
	}
</script>

<script>
	export let product;
	let subscription = false;
	let formHidden = true;
	let rnd = Math.random() * 10;
</script>

<main>
	<!-- This is a form for adding new products -->
	<form
		class="whitebox"
		action="/product.json"
		method="post"
		on:click={() => (formHidden = false)}
	>
		<h2>Add new product</h2>
		<div hidden={formHidden}>
			<input
				type="checkbox"
				id="subscription"
				name="subscription"
				bind:checked={subscription}
			/>
			<label id="subscription_label" for="subscription"
				>Subscription</label
			>
			<br />
			{#if subscription}
				<label for="delivery_interval">Delivery interval (days)</label>
				<input
					type="number"
					min="1"
					max="999"
					value="7"
					id="delivery_interval"
					name="delivery_interval"
					aria-label="Add product"
				/>
			{/if}
			<br />
			<label for="product_name">Name</label>
			<input
				type="text"
				id="product_name"
				name="product_name"
				aria-label="Add product"
			/>
			<br />
			<label for="price">Price ($)</label>
			<input
				type="number"
				id="price"
				name="price"
				aria-label="Add product"
			/>
			<br />
			<button type="submit">Submit</button>
		</div>
	</form>

	<h3 hidden={product.length > 0}>No products. Add something!</h3>

	<!-- This a list of all products -->
	{#each product as { product_name, product_id }}
		<a class="box" sveltekit:prefetch href={`/product/${product_id}`}>
			<h2>{product_name}</h2>
		</a>
		<br />
	{/each}
</main>

<style>
	#subscription_label {
		width: 0;
	}
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20vh;
	}
</style>
