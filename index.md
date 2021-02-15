---
layout: default
title: Home
---
<div class="home-head">
	<div class="head-overlay">
		<iframe class="headerAnimation" src="{{ site.url }}/assets/js/object.html" width="100%" height="525px" scrolling="no">
		</iframe>
		<div class="head-text-container">
			<div class="person-container">
				<img class="person-icon" src="/assets/images/bert.jpg">
			</div>
			<h1 class="head-name questr">Bert Koster</h1>
			<h2 class="head-undertext questr">
				<p>Front-end developer. HTML5, CSS3, Javascript,</p>
				<p>Jquery, ThreeJS, React.</p>
			</h2>
		</div>
	</div>
		<div class="position-container">
		<div class="portfolio-text text-container purple-container">
			<h1 class="questr gold">What do I do?</h1>
			<p class="white">If you like to know more about me, then take a look at my portfolio gallery to get a better impression of my current skills. The portfolio gallery gives an idea of my current capabilities in javascript and html/css programming. Besides that, I am always eager to learn something new to develop myself more as a front-end software developer.</p>
			<p class="white">Here are some of my projects.</p>
			<div class="portfolio-box">
				{% for post in site.categories.Portfolio %}
				    {% if post.url %}
				    	<div class="portfolio-container">
					    	<div class="portfolio-item">
					    		<p class="item-title questr gold">{{ post.title }}</p>
					        	<img src="{{ post.thumbnail }}" />
					        	<div class="project-button-container">
					        		<a href="/{{ post.title }}"><div class="view-project"><i class="fas fa-eye"></i><p>View project</p></div></a>
					        		<a href="{{ post.url }}"><div class="view-code"><i class="fas fa-code"></i><p>View code</p></div></a>
					        	</div>
					    	</div>
				    	</div>
				    {% endif %}
				{% endfor %}
			</div>
		</div>
	</div>
	<div class="text-container">
		<h1 class="questr purple">Who am I?</h1>
		<p>My name is Bert Koster, and I take interest in front-end webdevelopment. I finished studying Interaction Design at the Hanze Hogeschool in the city of Groningen in the Netherlands.
		</p>
		<p>I like to be a creative guy and experiment with libraries and frameworks like Three.js and React. One of the things that fascinate me is astronomy and space related things. This is why many of my projects are related to that theme. I like to do hobby projects with different frameworks to keep myself busy with coding and to develop myself further as a front-end developer. I want to bring the skills I learned during my studies and from my hobby projects to a new level and work for a company to create interesting and nice looking websites.
		</p>
		<p>If you want to know more about me, check out my <a href="{{ site.url }}/assets/curriculumvitae.pdf" target="_blank">Curriculum Vitae</a>.
		</p>
	</div>
	<div class="text-container contact">
		<h1 class="questr purple">Contact</h1>
		<center><p>If you are interested in my work, and like to contact me. You can contact me through linked-in or e-mail address.</p></center>
		<div class="center-content">
			<h2 class="purple">Contact me through linked-in</h2>
			<a target="_blank" href="https://www.linkedin.com/in/bert-koster-34254699/"><img class="linked-in-logo" src="/assets/images/linked-in.png"></a>
		</div>
		<div class="text-container purple-container form">
			<h2 class="gold">Or message me by mail</h2>
			<h3 class="white">koster_bert@hotmail.com</h3>
			<!-- <form action="mailto:bertkosterdev@gmail.com" method="post" enctype="text/plain">
				<div class="messageform">
					<p class="white">Your name:</p>
					<input type="text" name="name">
					<p class="white" name="mail">E-mail address:</p>
					<input type="text">
					<p class="white">Your message:</p>
					<textarea type="text" name="comment"></textarea>
					<input type="hidden" class="hp" name="hp">
					<div class="position-container">
						<input type="submit" value="Send">
					</div>
				</div>
			</form> -->
		</div>
	</div>
</div>
