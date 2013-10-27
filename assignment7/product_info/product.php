<?php
// check for data coming from the ajax request
if(!empty($_GET['productId']))
{
	$productId = $_GET['productId'];
}
else
{
	echo "No ID was entered";
	return;
}

$xml = @simplexml_load_file('products.xml');

// if the xml file loaded correctly
if($xml)
{
	$product_found = false;
	foreach($xml->children() as $product)
	{
		if($product->id == $productId)
		{
			$title = $product->title;
			$artist = $product->artist;
			$price = $product->price;
			$product_found = true;
		}
	}

	if($product_found)
	{
		echo "<strong>Item ID: </strong>" . $productId . "<br>";
		echo "<strong>Title: </strong>" . $title . "<br>";
		echo "<strong>Artist: </strong>" . $artist . "<br>";
		echo "<strong>Price: </strong>" . $price . "<br>";	
	}
	else
	{
		echo "There was no product found with that ID";
	}
}
else
{
	echo "XML file not found";
}
