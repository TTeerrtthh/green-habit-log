-- Populate habit_types table with comprehensive eco-friendly habits
INSERT INTO public.habit_types (id, name, description, co2_saved, icon, category) VALUES
-- Transport Category
('cycling', 'Cycle instead of drive', 'Choose cycling over driving for short trips', 1.2, '🚴‍♂️', 'transport'),
('public_transport', 'Use public transport', 'Take bus, train, or metro instead of private car', 3.2, '🚌', 'transport'),
('walking', 'Walk short distances', 'Walk for distances under 1km instead of driving', 1.0, '🚶‍♀️', 'transport'),
('work_from_home', 'Work from home', 'Reduce commuting by working remotely', 2.0, '🏠', 'transport'),
('carpool', 'Carpool with others', 'Share rides to reduce individual emissions', 1.5, '🚗', 'transport'),

-- Energy Category  
('use_stairs', 'Use stairs instead of elevator', 'Take the stairs to save electricity', 0.3, '🪜', 'energy'),
('unplug_devices', 'Unplug devices when not in use', 'Eliminate phantom energy consumption', 0.2, '🔌', 'energy'),
('natural_light', 'Use natural light during day', 'Avoid artificial lighting when possible', 0.4, '☀️', 'energy'),
('switch_off_electronics', 'Switch off electronics 2+ hours', 'Turn off TV, computers when not needed', 1.2, '📱', 'energy'),
('led_bulbs', 'Use LED bulbs', 'Replace incandescent with energy-efficient LEDs', 0.8, '💡', 'energy'),
('efficient_appliances', 'Use energy-efficient appliances', 'Choose ENERGY STAR rated appliances', 2.1, '🏠', 'energy'),

-- Food Category
('plant_based_meal', 'Choose plant-based meals', 'Eat vegetarian or vegan meals', 2.5, '🥗', 'food'),
('reduce_food_waste', 'Reduce food waste', 'Plan meals and use leftovers properly', 0.8, '♻️', 'food'),
('buy_local_produce', 'Buy local produce', 'Choose locally sourced food items', 0.5, '🥕', 'food'),
('grow_own_food', 'Grow own vegetables/herbs', 'Start a home garden or herb collection', 1.0, '🌱', 'food'),
('avoid_red_meat', 'Avoid red meat', 'Choose chicken, fish, or plant proteins', 3.5, '🐟', 'food'),

-- Consumption Category
('avoid_single_use_plastic', 'Avoid single-use plastic', 'Use reusable alternatives to plastic items', 0.5, '🚫', 'consumption'),
('reusable_water_bottle', 'Use reusable water bottle', 'Carry your own water bottle', 0.2, '🍶', 'consumption'),
('buy_second_hand', 'Buy second-hand items', 'Choose pre-owned over new products', 0.7, '👕', 'consumption'),
('digital_receipts', 'Choose digital receipts', 'Opt for electronic instead of paper receipts', 0.1, '📱', 'consumption'),
('repair_instead_replace', 'Repair instead of replace', 'Fix items instead of buying new ones', 1.2, '🔧', 'consumption'),

-- Water Category
('shorter_showers', 'Take shorter showers', 'Reduce shower time by 2-3 minutes', 0.6, '🚿', 'water'),
('fix_leaks', 'Fix water leaks', 'Repair dripping faucets and running toilets', 0.9, '🔧', 'water'),
('collect_rainwater', 'Collect rainwater', 'Use rainwater for gardening', 0.4, '🌧️', 'water'),
('full_dishwasher_loads', 'Run full dishwasher loads', 'Wait until dishwasher is full before running', 0.3, '🍽️', 'water'),

-- Waste Category  
('composting', 'Compost organic waste', 'Turn food scraps into useful compost', 1.1, '🍂', 'waste'),
('recycle_properly', 'Recycle properly', 'Sort and recycle materials correctly', 0.8, '♻️', 'waste'),
('paperless_billing', 'Use paperless billing', 'Choose electronic bills and statements', 0.2, '📧', 'waste'),
('donate_items', 'Donate unused items', 'Give away items instead of throwing away', 0.6, '🎁', 'waste')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  co2_saved = EXCLUDED.co2_saved,
  icon = EXCLUDED.icon,
  category = EXCLUDED.category;