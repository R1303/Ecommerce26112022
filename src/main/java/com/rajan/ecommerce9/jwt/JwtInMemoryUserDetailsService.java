package com.rajan.ecommerce9.jwt;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rajan.ecommerce9.database.config.UserJpaRespository;
import com.rajan.ecommerce9.entity.User;


@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

   public static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
   @Autowired
   private UserJpaRespository jpaRespository;

    public List<User> userList ;
	static {
//		inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
//				"$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
//		inMemoryUserList.add(new JwtUserDetails(2L, "ranga",
//				"$2a$10$IetbreuU5KihCkDB6/r1DOJO0VyU9lSiBcrMDT.biU7FOt2oqZDPm", "ROLE_USER_2"));
		inMemoryUserList.add(new JwtUserDetails(3L, "rajan",
				"$2a$10$2jJfB6f9UVTN38ZXFeJn3.IflKTOdSZtwQxdA8KFyJdAq4ObbCJVe", "ROLE_USER_2"));
		
		//$2a$10$IetbreuU5KihCkDB6/r1DOJO0VyU9lSiBcrMDT.biU7FOt2oqZDPm
		
		//$2a$10$2jJfB6f9UVTN38ZXFeJn3.IflKTOdSZtwQxdA8KFyJdAq4ObbCJVe
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		loadUserData();
		Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
				.filter(user -> user.getUsername().equals(username)).findFirst();

		if (!findFirst.isPresent()) {
			throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
		}

		return findFirst.get();
	}
	
	public void loadUserData() {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		if(userList==null)
			userList=jpaRespository.findAll();
		if (userList!=null) {
			Iterator<User> itr = userList.iterator();
			while (itr.hasNext()) {
				User user = (User) itr.next();
				String encodedPassword = bCryptPasswordEncoder.encode(user.getUserPassword());
				inMemoryUserList
				.add(new JwtUserDetails(user.getId(), user.getUserEmail(), encodedPassword, "ROLE_USER_2"));
			}
			System.out.println(userList.size()+" Active User Found !!");
		} else {
			System.out.println("No User Found !!");
		}
	}

}