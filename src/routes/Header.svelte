<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import saltLogo from '../assets/images/icons/SaltLogo.svg';
	import { Label, Input, Button, Modal, Textarea, Select } from 'flowbite-svelte';
	let defaultModal = false;
	const handleSubmit = () => {
		alert('Form submited.');
	};
	/**
	 * @type {any}
	 */
	let selected;
	let countries = [
		{ value: 'tv', name: 'TV/Monitors' },
		{ value: 'pc', name: 'PC' },
		{ value: 'phone', name: 'Phones' }
	];
</script>

<!-- Header  -->
<Navbar let:NavContainer color="primary" class="py-6">
	<NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
		<NavBrand href="/">
			<img src={saltLogo} alt="Salt Logo" class="w-24 h-24 dark:white-logo" />
		</NavBrand>
		<NavHamburger />
		<NavUl class="flex align-middle">
			<NavLi href="/">Rankings</NavLi>
			<NavLi href="/compare">Compare</NavLi>
			<NavLi on:click={() => (defaultModal = true)} href="javascript:void(0);">Add New</NavLi>
		</NavUl>
	</NavContainer>
</Navbar>

<!-- Comparison Modal -->
<Modal title="Add Product" bind:open={defaultModal} autoclose class="min-w-full">
	<form on:submit={handleSubmit}>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input type="text" id="name" placeholder="Type participant name" required />
			</div>
			<div>
				<Label for="alias" class="mb-2">Alias</Label>
				<Input type="text" id="alias" placeholder="Type participant alias" required />
			</div>
			<div>
				<Label for="rating">Predicted Rating (optional)</Label>
				<span class="text-xs italic font-thin">Rating should be between 800 to 2000 to start.</span>
				<Input type="text" id="rating" class="mt-1" placeholder="Default rating is 1500" />
			</div>
			<div />
			<Button type="submit" class="w-52">
				<svg
					class="mr-1 -ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					/></svg
				>
				Add new player
			</Button>
		</div>
	</form>
</Modal>
