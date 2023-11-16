<script>
	import {
		// @ts-ignore
		Table,
		Checkbox,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		Button,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';
	import { ChevronDownSolid, FilterSolid, PlusSolid } from 'flowbite-svelte-icons';
	import { Section } from 'flowbite-svelte-blocks';
	import { writable } from 'svelte/store';

	let divClass = 'bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let svgDivClass = 'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none';
	let classInput =
		'text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2  pl-10';

	let searchTerm = '';
	let players = [
		{ id: 1, name: 'Player 1', alias: 'Camjkz', rating: 2000, rd: 350, vol: 0.06 },
		{ id: 2, name: 'Player 2', alias: 'Hector', rating: 1500, rd: 320, vol: 0.06 },
		{ id: 3, name: 'Player 3', alias: 'Sikey', rating: 1800, rd: 130, vol: 0.06 },
		{ id: 4, name: 'Player 4', alias: 'Zebraboi', rating: 1900, rd: 200, vol: 0.06 }
	];
	$: filteredItems = players.filter(
		(player) =>
			player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			player.alias.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// sorting variables
	const sortKey = writable('id'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(players.slice()); // make a copy of the players array

	// Define a function to sort the players
	const sortTable = (/** @type {any} */ key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	// @ts-ignore
	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			// @ts-ignore
			const aVal = a[key];
			// @ts-ignore
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}
</script>

<div class="container mx-auto px-1 py-4">
	<TableSearch
		placeholder="Search by player name or alias"
		hoverable={true}
		bind:inputValue={searchTerm}
		{divClass}
		{innerDivClass}
		{searchClass}
		{classInput}
		striped={true}
		shadow={true}
		class="bg-white"
	>
		<div
			slot="header"
			class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
		>
			<Button>
				<PlusSolid class="h-3.5 w-3.5 mr-2" />Add product
			</Button>
			<Button color="alternative">Actions<ChevronDownSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-44 divide-y divide-gray-100">
				<DropdownItem>Mass Edit</DropdownItem>
				<DropdownItem>Delete all</DropdownItem>
			</Dropdown>
			<Button color="alternative">Filter<FilterSolid class="w-3 h-3 ml-2 " /></Button>
			<Dropdown class="w-48 p-3 space-y-2 text-sm">
				<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
				<li>
					<Checkbox>Apple (56)</Checkbox>
				</li>
				<li>
					<Checkbox>Microsoft (16)</Checkbox>
				</li>
				<li>
					<Checkbox>Razor (49)</Checkbox>
				</li>
				<li>
					<Checkbox>Nikon (12)</Checkbox>
				</li>
				<li>
					<Checkbox>BenQ (74)</Checkbox>
				</li>
			</Dropdown>
		</div>
		<TableHead>
			<TableHeadCell class="!p-4 bg-white">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('id')}>ID</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('rating')}
				>Rating</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('name')}>Name</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('alias')}>Alias</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('rd')}
				>Rating Deviation</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('vol')}
				>Volatility</TableHeadCell
			>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each filteredItems as item}
				<TableBodyRow>
					<TableHeadCell class="!p-4">
						<Checkbox />
					</TableHeadCell>
					<TableBodyCell>{item.id}</TableBodyCell>
					<TableBodyCell>{item.rating}</TableBodyCell>
					<TableBodyCell>{item.name}</TableBodyCell>
					<TableBodyCell>{item.alias}</TableBodyCell>
					<TableBodyCell>{item.rd}</TableBodyCell>
					<TableBodyCell>{item.vol}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
